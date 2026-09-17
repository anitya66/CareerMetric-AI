package com.careermetric.ai.tool;

import com.careermetric.resume.entity.Resume;
import com.careermetric.resume.repository.ResumeRepository;
import com.careermetric.security.service.CurrentUserService;
import com.careermetric.skill.entity.ResumeTechnology;
import com.careermetric.skill.repository.ResumeTechnologyRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class ToolService {

    private final CurrentUserService currentUserService;
    private final ResumeTechnologyRepository resumeTechnologyRepository;
    private final ResumeRepository resumeRepository;

    public ToolService(
            CurrentUserService currentUserService,
            ResumeTechnologyRepository resumeTechnologyRepository,
            ResumeRepository resumeRepository) {

        this.currentUserService = currentUserService;
        this.resumeTechnologyRepository = resumeTechnologyRepository;
        this.resumeRepository = resumeRepository;
    }

    public List<ResumeTechnology> getCurrentUserResumeTechnologies() {

        Long userId = currentUserService.getCurrentUserId();

        return resumeTechnologyRepository
                .findAllByResumeUserId(userId);
    }

    public Resume getCurrentUserLatestResume() {

        Long userId = currentUserService.getCurrentUserId();

        List<Resume> resumes =
                resumeRepository.findAllByUserId(userId);

        if (resumes.isEmpty()) {
            return null;
        }

        return resumes.stream()
                .max(
                        Comparator.comparing(
                                Resume::getCreatedAt,
                                Comparator.nullsLast(
                                        Comparator.naturalOrder()
                                )
                        )
                )
                .orElse(null);
    }
}