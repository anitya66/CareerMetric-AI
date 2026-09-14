package com.careermetric.resume.service;

import com.careermetric.auth.entity.User;
import com.careermetric.resume.dto.ResumeDetailResponse;
import com.careermetric.resume.dto.ResumeResponse;
import com.careermetric.resume.entity.Resume;
import com.careermetric.resume.entity.ResumeStatus;
import com.careermetric.resume.extraction.ResumeTextExtractionService;
import com.careermetric.resume.mapper.ResumeMapper;
import com.careermetric.resume.repository.ResumeRepository;
import com.careermetric.resume.storage.ResumeStorageService;
import com.careermetric.resume.validation.ResumeFileValidator;
import com.careermetric.security.service.CurrentUserService;
import org.springframework.stereotype.Service;
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

    public ResumeServiceImpl(
            ResumeRepository resumeRepository,
            ResumeMapper resumeMapper,
            CurrentUserService currentUserService,
            ResumeFileValidator resumeFileValidator,
            ResumeStorageService resumeStorageService,
            ResumeTextExtractionService resumeTextExtractionService
    ) {
        this.resumeRepository = resumeRepository;
        this.resumeMapper = resumeMapper;
        this.currentUserService = currentUserService;
        this.resumeFileValidator = resumeFileValidator;
        this.resumeStorageService = resumeStorageService;
        this.resumeTextExtractionService = resumeTextExtractionService;
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

    String filePath = resume.getFilePath();

    resumeRepository.delete(resume);

    resumeStorageService.delete(filePath);
}
}