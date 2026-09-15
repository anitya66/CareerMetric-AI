package com.careermetric.skill.service;

import com.careermetric.ai.dto.ExtractedTechnology;
import com.careermetric.ai.dto.TechnologyExtractionAiResult;
import com.careermetric.resume.entity.Resume;
import com.careermetric.skill.entity.ResumeTechnology;
import com.careermetric.skill.entity.Technology;
import com.careermetric.skill.entity.TechnologyCategory;
import com.careermetric.skill.repository.ResumeTechnologyRepository;
import com.careermetric.skill.repository.TechnologyRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

@Service
public class TechnologyPersistenceServiceImpl
        implements TechnologyPersistenceService {

    private final TechnologyRepository technologyRepository;
    private final ResumeTechnologyRepository resumeTechnologyRepository;

    public TechnologyPersistenceServiceImpl(
            TechnologyRepository technologyRepository,
            ResumeTechnologyRepository resumeTechnologyRepository
    ) {
        this.technologyRepository = technologyRepository;
        this.resumeTechnologyRepository = resumeTechnologyRepository;
    }

    @Override
    @Transactional
    public void syncExtractedTechnologies(
            Resume resume,
            TechnologyExtractionAiResult extractionResult
    ) {

        if (resume == null || extractionResult == null) {
            return;
        }

        List<ExtractedTechnology> extractedTechnologies =
                extractionResult.technologies();

        if (extractedTechnologies == null
                || extractedTechnologies.isEmpty()) {
            resumeTechnologyRepository.deleteAllByResumeId(resume.getId());
            return;
        }

        /*
         * Re-analysis behavior:
         *
         * We want the resume_technologies table to represent
         * the CURRENT extraction result.
         *
         * Shared Technology records are not deleted.
         */
        resumeTechnologyRepository.deleteAllByResumeId(resume.getId());

        for (ExtractedTechnology extractedTechnology : extractedTechnologies) {

            if (extractedTechnology == null) {
                continue;
            }

            String technologyName =
                    normalizeTechnologyName(extractedTechnology.name());

            if (technologyName == null) {
                continue;
            }

            TechnologyCategory category =
                    resolveCategory(extractedTechnology.category());

            Technology technology =
                    technologyRepository
                            .findByNameIgnoreCase(technologyName)
                            .orElseGet(() ->
                                    createTechnology(
                                            technologyName,
                                            category
                                    )
                            );

            ResumeTechnology resumeTechnology =
                    new ResumeTechnology();

            resumeTechnology.setResume(resume);
            resumeTechnology.setTechnology(technology);
            resumeTechnology.setEvidence(
                    buildEvidence(extractedTechnology.evidence())
            );

            resumeTechnologyRepository.save(resumeTechnology);
        }
    }

    private Technology createTechnology(
            String name,
            TechnologyCategory category
    ) {
        Technology technology = new Technology();

        technology.setName(name);
        technology.setCategory(category);

        return technologyRepository.save(technology);
    }

    private String normalizeTechnologyName(String name) {

        if (name == null || name.isBlank()) {
            return null;
        }

        return name
                .trim()
                .replaceAll("\\s+", " ");
    }

    private TechnologyCategory resolveCategory(String category) {

        if (category == null || category.isBlank()) {
            return TechnologyCategory.OTHER;
        }

        try {
            return TechnologyCategory.valueOf(
                    category
                            .trim()
                            .toUpperCase(Locale.ROOT)
            );
        } catch (IllegalArgumentException exception) {
            return TechnologyCategory.OTHER;
        }
    }

    private String buildEvidence(List<String> evidence) {

        if (evidence == null || evidence.isEmpty()) {
            return null;
        }

        return evidence.stream()
                .filter(item -> item != null && !item.isBlank())
                .map(String::trim)
                .reduce(
                        (first, second) ->
                                first + " | " + second
                )
                .orElse(null);
    }
}