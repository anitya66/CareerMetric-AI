package com.careermetric.resume.service;

import com.careermetric.ai.dto.ResumeAnalysisAiResult;
import com.careermetric.ai.service.ResumeAiService;
import com.careermetric.auth.entity.User;
import com.careermetric.resume.dto.ResumeAnalysisResponse;
import com.careermetric.resume.dto.ResumeDetailResponse;
import com.careermetric.resume.dto.ResumeResponse;
import com.careermetric.resume.entity.Resume;
import com.careermetric.resume.entity.ResumeAnalysis;
import com.careermetric.resume.entity.ResumeStatus;
import com.careermetric.resume.extraction.ResumeTextExtractionService;
import com.careermetric.resume.mapper.ResumeAnalysisMapper;
import com.careermetric.resume.mapper.ResumeMapper;
import com.careermetric.resume.repository.ResumeAnalysisRepository;
import com.careermetric.resume.repository.ResumeRepository;
import com.careermetric.resume.scoring.ResumeScoringResult;
import com.careermetric.resume.scoring.ResumeScoringService;
import com.careermetric.resume.storage.ResumeStorageService;
import com.careermetric.resume.validation.ResumeFileValidator;
import com.careermetric.security.service.CurrentUserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final ResumeMapper resumeMapper;
    private final CurrentUserService currentUserService;
    private final ResumeFileValidator resumeFileValidator;
    private final ResumeStorageService resumeStorageService;
    private final ResumeTextExtractionService resumeTextExtractionService;

    private final ResumeAiService resumeAiService;
    private final ResumeScoringService resumeScoringService;
    private final ResumeAnalysisRepository resumeAnalysisRepository;
    private final ResumeAnalysisMapper resumeAnalysisMapper;

    public ResumeServiceImpl(
            ResumeRepository resumeRepository,
            ResumeMapper resumeMapper,
            CurrentUserService currentUserService,
            ResumeFileValidator resumeFileValidator,
            ResumeStorageService resumeStorageService,
            ResumeTextExtractionService resumeTextExtractionService,
            ResumeAiService resumeAiService,
            ResumeScoringService resumeScoringService,
            ResumeAnalysisRepository resumeAnalysisRepository,
            ResumeAnalysisMapper resumeAnalysisMapper
    ) {
        this.resumeRepository = resumeRepository;
        this.resumeMapper = resumeMapper;
        this.currentUserService = currentUserService;
        this.resumeFileValidator = resumeFileValidator;
        this.resumeStorageService = resumeStorageService;
        this.resumeTextExtractionService = resumeTextExtractionService;
        this.resumeAiService = resumeAiService;
        this.resumeScoringService = resumeScoringService;
        this.resumeAnalysisRepository = resumeAnalysisRepository;
        this.resumeAnalysisMapper = resumeAnalysisMapper;
    }

    @Override
    public ResumeResponse uploadResume(MultipartFile file) {

        Long userId =
                currentUserService.getCurrentUserId();

        resumeFileValidator.validate(file);

        String storedFilePath =
                resumeStorageService.store(
                        file,
                        userId
                );

        try {

            String extractedText =
                    resumeTextExtractionService.extractText(
                            file
                    );

            User user =
                    currentUserService.getCurrentUser();

            Resume resume = new Resume();

            resume.setUser(user);

            resume.setFileName(
                    file.getOriginalFilename()
            );

            resume.setFileType(
                    file.getContentType()
            );

            resume.setFilePath(
                    storedFilePath
            );

            resume.setExtractedText(
                    extractedText
            );

            resume.setStatus(
                    ResumeStatus.UPLOADED
            );

            Resume savedResume =
                    resumeRepository.save(resume);

            return resumeMapper.toResponse(
                    savedResume
            );

        } catch (RuntimeException exception) {

            resumeStorageService.delete(
                    storedFilePath
            );

            throw exception;
        }
    }

    @Override
    public List<ResumeResponse> getMyResumes() {

        Long userId =
                currentUserService.getCurrentUserId();

        return resumeRepository
                .findAllByUserId(userId)
                .stream()
                .map(resumeMapper::toResponse)
                .toList();
    }

    @Override
    public ResumeDetailResponse getMyResume(Long resumeId) {

        Long userId =
                currentUserService.getCurrentUserId();

        Resume resume =
                resumeRepository
                        .findByIdAndUserId(
                                resumeId,
                                userId
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Resume not found"
                                )
                        );

        return resumeMapper.toDetailResponse(
                resume
        );
    }

    @Override
    @Transactional
    public ResumeAnalysisResponse analyzeMyResume(Long resumeId) {

        Long userId =
                currentUserService.getCurrentUserId();

        Resume resume =
                resumeRepository
                        .findByIdAndUserId(
                                resumeId,
                                userId
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Resume not found"
                                )
                        );

        if (resume.getExtractedText() == null ||
                resume.getExtractedText().isBlank()) {

            throw new IllegalStateException(
                    "Resume does not contain extracted text"
            );
        }

        /*
         * Step 1:
         * Send resume text to Spring AI.
         */
        ResumeAnalysisAiResult aiResult =
                resumeAiService.analyzeResume(
                        resume.getExtractedText()
                );

        /*
         * Step 2:
         * Calculate deterministic resume score.
         */
        ResumeScoringResult scoringResult =
                resumeScoringService.calculateScore(
                        resume.getExtractedText(),
                        aiResult
                );

        /*
         * Step 3:
         * Find existing analysis.
         *
         * One resume has only one current/latest analysis.
         */
        ResumeAnalysis analysis =
                resumeAnalysisRepository
                        .findByResumeId(resumeId)
                        .orElseGet(() -> {

                            ResumeAnalysis newAnalysis =
                                    new ResumeAnalysis();

                            newAnalysis.setResume(resume);

                            return newAnalysis;
                        });

        /*
         * Step 4:
         * Populate/update analysis entity.
         */
        resumeAnalysisMapper.updateEntity(
                analysis,
                aiResult,
                scoringResult.overallScore(),
                scoringResult.scoreBreakdown()
        );

        /*
         * Step 5:
         * Persist analysis.
         */
        ResumeAnalysis savedAnalysis =
                resumeAnalysisRepository.save(
                        analysis
                );

        /*
         * Step 6:
         * Convert entity into API response.
         */
        return resumeAnalysisMapper.toResponse(
                savedAnalysis
        );
    }

    @Override
    @Transactional(readOnly = true)
    public ResumeAnalysisResponse getMyResumeAnalysis(
            Long resumeId
    ) {

        Long userId =
                currentUserService.getCurrentUserId();

        /*
         * First verify that this resume belongs
         * to the authenticated user.
         */
        Resume resume =
                resumeRepository
                        .findByIdAndUserId(
                                resumeId,
                                userId
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Resume not found"
                                )
                        );

        /*
         * Then retrieve the already generated analysis.
         *
         * IMPORTANT:
         * This does NOT call the AI again.
         */
        ResumeAnalysis analysis =
                resumeAnalysisRepository
                        .findByResumeId(
                                resume.getId()
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Resume analysis not found"
                                )
                        );

        return resumeAnalysisMapper.toResponse(
                analysis
        );
    }

    @Override
    public void deleteMyResume(Long resumeId) {

        Long userId =
                currentUserService.getCurrentUserId();

        Resume resume =
                resumeRepository
                        .findByIdAndUserId(
                                resumeId,
                                userId
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Resume not found"
                                )
                        );

        String filePath =
                resume.getFilePath();

        resumeRepository.delete(resume);

        resumeStorageService.delete(
                filePath
        );
    }
}