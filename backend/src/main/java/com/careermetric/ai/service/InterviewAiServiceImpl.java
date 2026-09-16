package com.careermetric.ai.service;

import com.careermetric.ai.dto.InterviewEvaluationAiResult;
import com.careermetric.ai.dto.InterviewQuestionAiResult;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class InterviewAiServiceImpl implements InterviewAiService {

    private final ChatClient chatClient;

    public InterviewAiServiceImpl(
            ChatClient chatClient
    ) {
        this.chatClient = chatClient;
    }

    @Override
    public InterviewQuestionAiResult generateQuestions(
            String technologyName,
            String difficulty,
            int questionCount
    ) {

        String prompt = """
                You are an expert technical interviewer conducting
                a technical interview for a fresher Java Full Stack Developer.

                Generate exactly %d interview questions.

                Technology:
                %s

                Difficulty:
                %s

                Rules:

                1. Generate exactly %d questions.
                2. Questions must be open-ended technical interview questions.
                3. Questions must be relevant to the requested technology.
                4. Questions must match the requested difficulty.
                5. Questions must be suitable for a fresher or entry-level developer.
                6. Test understanding rather than simple memorization.
                7. Include practical or scenario-based questions where appropriate.
                8. Do not ask questions that require professional experience.
                9. Do not assume anything about the candidate.
                10. Do not invent APIs, classes, annotations, frameworks,
                    or technologies.
                11. Do not generate duplicate or nearly identical questions.
                12. Do not provide answers.
                13. Do not provide explanations.
                14. Return only the requested structured output.
                """.formatted(
                questionCount,
                technologyName,
                difficulty,
                questionCount
        );

        return chatClient
                .prompt()
                .user(prompt)
                .call()
                .entity(
                        InterviewQuestionAiResult.class,
                        spec -> spec
                                .useProviderStructuredOutput()
                                .validateSchema()
                );
    }

    @Override
    public InterviewEvaluationAiResult evaluateAnswer(
            String technologyName,
            String difficulty,
            String question,
            String answer
    ) {

        String prompt = """
                You are an expert technical interviewer evaluating
                a fresher-level technical interview answer.

                Technology:
                %s

                Interview difficulty:
                %s

                Interview question:
                %s

                Candidate answer:
                %s

                Evaluate ONLY the candidate's answer to this question.

                Evaluation criteria:

                1. Technical correctness.
                2. Relevance to the question.
                3. Understanding of the concept.
                4. Explanation quality.
                5. Practical understanding where applicable.

                Scoring:

                0-20:
                Completely incorrect, irrelevant, or almost no understanding.

                21-40:
                Significant gaps or mostly incorrect understanding.

                41-60:
                Basic understanding but important gaps exist.

                61-80:
                Good understanding with minor gaps.

                81-100:
                Strong and accurate understanding with a clear explanation.

                Important rules:

                1. Score must be between 0 and 100.
                2. Do not penalize the candidate for being a fresher.
                3. Do not require professional experience.
                4. Do not assume information that is not present in the answer.
                5. Do not invent candidate experience.
                6. Feedback must be specific and useful.
                7. Strengths must describe what the candidate did well.
                8. Improvements must describe concrete areas to improve.
                9. Do not rewrite the candidate's entire answer.
                10. Return only the requested structured output.
                """.formatted(
                technologyName,
                difficulty,
                question,
                answer
        );

        return chatClient
                .prompt()
                .user(prompt)
                .call()
                .entity(
                        InterviewEvaluationAiResult.class,
                        spec -> spec
                                .useProviderStructuredOutput()
                                .validateSchema()
                );
    }
}