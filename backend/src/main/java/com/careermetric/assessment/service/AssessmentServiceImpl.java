package com.careermetric.assessment.service;

import com.careermetric.ai.dto.AssessmentQuestionAi;
import com.careermetric.ai.dto.AssessmentQuestionAiResult;
import com.careermetric.ai.service.AssessmentQuestionAiService;
import com.careermetric.assessment.dto.AssessmentDetailResponse;
import com.careermetric.assessment.dto.AssessmentResponse;
import com.careermetric.assessment.dto.CreateAssessmentRequest;
import com.careermetric.assessment.entity.Assessment;
import com.careermetric.assessment.entity.AssessmentStatus;
import com.careermetric.assessment.entity.Question;
import com.careermetric.assessment.entity.QuestionType;
import com.careermetric.assessment.mapper.AssessmentMapper;
import com.careermetric.assessment.repository.AssessmentRepository;
import com.careermetric.assessment.repository.QuestionRepository;
import com.careermetric.auth.entity.User;
import com.careermetric.security.service.CurrentUserService;
import com.careermetric.skill.entity.Technology;
import com.careermetric.skill.repository.ResumeTechnologyRepository;
import com.careermetric.skill.repository.TechnologyRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AssessmentServiceImpl
        implements AssessmentService {

    private static final int DEFAULT_QUESTION_COUNT = 5;

    private final AssessmentRepository assessmentRepository;
    private final QuestionRepository questionRepository;
    private final TechnologyRepository technologyRepository;
    private final ResumeTechnologyRepository resumeTechnologyRepository;
    private final CurrentUserService currentUserService;
    private final AssessmentMapper assessmentMapper;
    private final AssessmentQuestionAiService
            assessmentQuestionAiService;

    public AssessmentServiceImpl(
            AssessmentRepository assessmentRepository,
            QuestionRepository questionRepository,
            TechnologyRepository technologyRepository,
            ResumeTechnologyRepository resumeTechnologyRepository,
            CurrentUserService currentUserService,
            AssessmentMapper assessmentMapper,
            AssessmentQuestionAiService assessmentQuestionAiService
    ) {
        this.assessmentRepository =
                assessmentRepository;

        this.questionRepository =
                questionRepository;

        this.technologyRepository =
                technologyRepository;

        this.resumeTechnologyRepository =
                resumeTechnologyRepository;

        this.currentUserService =
                currentUserService;

        this.assessmentMapper =
                assessmentMapper;

        this.assessmentQuestionAiService =
                assessmentQuestionAiService;
    }

    @Override
    @Transactional
    public AssessmentResponse createAssessment(
            CreateAssessmentRequest request
    ) {

        Long userId =
                currentUserService.getCurrentUserId();

        User user =
                currentUserService.getCurrentUser();

        /*
         * Step 1:
         * Find the requested technology.
         */
        Technology technology =
                technologyRepository
                        .findById(request.technologyId())
                        .orElseThrow(
                                () -> new IllegalArgumentException(
                                        "Technology not found"
                                )
                        );

        /*
         * Step 2:
         * Verify that this technology is actually
         * associated with one of the user's resumes.
         */
        boolean ownsTechnology =
                resumeTechnologyRepository
                        .existsByResumeUserIdAndTechnologyId(
                                userId,
                                technology.getId()
                        );

        if (!ownsTechnology) {

            throw new IllegalArgumentException(
                    "Technology is not associated with your resume"
            );
        }

        /*
         * Step 3:
         * Create the assessment.
         */
        Assessment assessment =
                new Assessment();

        assessment.setUser(user);

        assessment.setTechnology(
                technology
        );

        assessment.setDifficulty(
                request.difficulty()
        );

        assessment.setStatus(
                AssessmentStatus.CREATED
        );

        assessment.setQuestionCount(
                DEFAULT_QUESTION_COUNT
        );

        Assessment savedAssessment =
                assessmentRepository.save(
                        assessment
                );

        /*
         * Step 4:
         * Generate assessment questions using AI.
         */
        AssessmentQuestionAiResult aiResult =
                assessmentQuestionAiService.generateQuestions(
                        technology.getName(),
                        request.difficulty().name(),
                        DEFAULT_QUESTION_COUNT
                );

        /*
         * Step 5:
         * Validate the AI result before touching
         * the Question table.
         */
        validateAiResult(
                aiResult,
                DEFAULT_QUESTION_COUNT
        );

        /*
         * Step 6:
         * Convert AI questions into database entities.
         */
        List<Question> questions =
                aiResult.questions()
                        .stream()
                        .map(question ->
                                toQuestionEntity(
                                        savedAssessment,
                                        question
                                )
                        )
                        .toList();

        /*
         * Step 7:
         * Persist all questions.
         */
        questionRepository.saveAll(
                questions
        );

        /*
         * Step 8:
         * Mark assessment as ready.
         */
        savedAssessment.setStatus(
                AssessmentStatus.READY
        );

        Assessment readyAssessment =
                assessmentRepository.save(
                        savedAssessment
                );

        return assessmentMapper.toResponse(
                readyAssessment
        );
    }

    @Override
    @Transactional
    public List<AssessmentResponse> getMyAssessments() {

        Long userId =
                currentUserService.getCurrentUserId();

        return assessmentRepository
                .findAllByUserId(userId)
                .stream()
                .map(assessmentMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public AssessmentDetailResponse getMyAssessment(
            Long assessmentId
    ) {

        Long userId =
                currentUserService.getCurrentUserId();

        Assessment assessment =
                assessmentRepository
                        .findByIdAndUserId(
                                assessmentId,
                                userId
                        )
                        .orElseThrow(
                                () -> new IllegalArgumentException(
                                        "Assessment not found"
                                )
                        );

        List<Question> questions =
                questionRepository
                        .findAllByAssessmentId(
                                assessmentId
                        );

        return assessmentMapper.toDetailResponse(
                assessment,
                questions
        );
    }

    private void validateAiResult(
            AssessmentQuestionAiResult aiResult,
            int expectedQuestionCount
    ) {

        if (aiResult == null
                || aiResult.questions() == null) {

            throw new IllegalStateException(
                    "AI did not return assessment questions"
            );
        }

        if (aiResult.questions().size()
                != expectedQuestionCount) {

            throw new IllegalStateException(
                    "AI returned an invalid number of questions"
            );
        }

        Set<String> questionTexts =
                new HashSet<>();

        for (AssessmentQuestionAi question
                : aiResult.questions()) {

            if (question == null) {

                throw new IllegalStateException(
                        "AI returned an invalid question"
                );
            }

            if (question.questionText() == null
                    || question.questionText().isBlank()) {

                throw new IllegalStateException(
                        "AI returned a question without text"
                );
            }

            if (!"MCQ".equalsIgnoreCase(
                    question.questionType()
            )) {

                throw new IllegalStateException(
                        "Only MCQ questions are supported"
                );
            }

            if (question.options() == null
                    || question.options().size() != 4) {

                throw new IllegalStateException(
                        "Each question must contain exactly four options"
                );
            }

            for (String option : question.options()) {

                if (option == null
                        || option.isBlank()) {

                    throw new IllegalStateException(
                            "Question options cannot be empty"
                    );
                }
            }

            if (question.correctAnswer() == null
                    || question.correctAnswer().isBlank()) {

                throw new IllegalStateException(
                        "Question must contain a correct answer"
                );
            }

            boolean correctAnswerExists =
                    question.options()
                            .stream()
                            .anyMatch(option ->
                                    option.equals(
                                            question.correctAnswer()
                                    )
                            );

            if (!correctAnswerExists) {

                throw new IllegalStateException(
                        "Correct answer must match one of the options"
                );
            }

            if (question.explanation() == null
                    || question.explanation().isBlank()) {

                throw new IllegalStateException(
                        "Question explanation cannot be empty"
                );
            }

            String normalizedQuestion =
                    question.questionText()
                            .trim()
                            .toLowerCase();

            if (!questionTexts.add(
                    normalizedQuestion
            )) {

                throw new IllegalStateException(
                        "AI generated duplicate questions"
                );
            }
        }
    }

    private Question toQuestionEntity(
            Assessment assessment,
            AssessmentQuestionAi aiQuestion
    ) {

        Question question =
                new Question();

        question.setAssessment(
                assessment
        );

        question.setQuestionText(
                aiQuestion.questionText().trim()
        );

        question.setQuestionType(
                QuestionType.MCQ
        );

        question.setOptions(
                aiQuestion.options()
        );

        question.setCorrectAnswer(
                aiQuestion.correctAnswer()
        );

        question.setExplanation(
                aiQuestion.explanation()
        );

        return question;
    }
}