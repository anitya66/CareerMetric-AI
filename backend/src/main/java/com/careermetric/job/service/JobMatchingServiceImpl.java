package com.careermetric.job.service;

import com.careermetric.ai.service.EmbeddingService;
import com.careermetric.job.dto.JobMatchRequest;
import com.careermetric.job.dto.JobMatchResponse;
import com.careermetric.job.entity.JobDescription;
import com.careermetric.job.entity.JobRequirement;
import com.careermetric.job.entity.JobRequirementType;
import com.careermetric.job.repository.JobDescriptionRepository;
import com.careermetric.job.repository.JobRequirementRepository;
import com.careermetric.resume.entity.Resume;
import com.careermetric.resume.repository.ResumeRepository;
import com.careermetric.security.service.CurrentUserService;
import com.careermetric.skill.entity.ResumeTechnology;
import com.careermetric.skill.repository.ResumeTechnologyRepository;
import org.springframework.ai.document.Document;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class JobMatchingServiceImpl implements JobMatchingService {

    private static final int RESUME_CHUNK_SIZE = 1000;

    /*
     * Semantic matching is used only as a fallback
     * when direct evidence cannot establish a match.
     */
    private static final double SEMANTIC_MATCH_THRESHOLD = 0.70;

    private final JobDescriptionRepository jobDescriptionRepository;
    private final JobRequirementRepository jobRequirementRepository;
    private final ResumeRepository resumeRepository;
    private final ResumeTechnologyRepository resumeTechnologyRepository;
    private final CurrentUserService currentUserService;
    private final EmbeddingService embeddingService;

    public JobMatchingServiceImpl(
            JobDescriptionRepository jobDescriptionRepository,
            JobRequirementRepository jobRequirementRepository,
            ResumeRepository resumeRepository,
            ResumeTechnologyRepository resumeTechnologyRepository,
            CurrentUserService currentUserService,
            EmbeddingService embeddingService
    ) {
        this.jobDescriptionRepository = jobDescriptionRepository;
        this.jobRequirementRepository = jobRequirementRepository;
        this.resumeRepository = resumeRepository;
        this.resumeTechnologyRepository = resumeTechnologyRepository;
        this.currentUserService = currentUserService;
        this.embeddingService = embeddingService;
    }

    @Override
    public JobMatchResponse matchResumeWithJob(
            JobMatchRequest request
    ) {

        Long userId = currentUserService.getCurrentUserId();

        // ---------------------------------------------------------
        // 1. Verify resume belongs to current user
        // ---------------------------------------------------------

        Resume resume = resumeRepository
                .findByIdAndUserId(
                        request.resumeId(),
                        userId
                )
                .orElseThrow(() -> new IllegalArgumentException(
                        "Resume not found"
                ));

        // ---------------------------------------------------------
        // 2. Verify job description belongs to current user
        // ---------------------------------------------------------

        JobDescription jobDescription = jobDescriptionRepository
                .findByIdAndUserId(
                        request.jobDescriptionId(),
                        userId
                )
                .orElseThrow(() -> new IllegalArgumentException(
                        "Job description not found"
                ));

        // ---------------------------------------------------------
        // 3. Get AI-extracted job requirements
        // ---------------------------------------------------------

        List<JobRequirement> requirements =
                jobRequirementRepository
                        .findAllByJobDescriptionId(
                                jobDescription.getId()
                        );

        if (requirements.isEmpty()) {
            throw new IllegalStateException(
                    "Job description has not been analyzed yet"
            );
        }

        // ---------------------------------------------------------
        // 4. Get technologies extracted from resume
        // ---------------------------------------------------------

        List<ResumeTechnology> resumeTechnologies =
                resumeTechnologyRepository
                        .findAllByResumeId(resume.getId());

        Set<String> resumeSkills = resumeTechnologies
                .stream()
                .map(ResumeTechnology::getTechnology)
                .map(technology ->
                        normalize(technology.getName())
                )
                .collect(Collectors.toSet());

        // ---------------------------------------------------------
        // 5. Index resume text in PGVector
        // ---------------------------------------------------------

        indexResume(resume);

        // ---------------------------------------------------------
        // 6. Prepare matching result
        // ---------------------------------------------------------

        List<String> matchedSkills = new ArrayList<>();

        List<String> missingRequiredSkills =
                new ArrayList<>();

        List<String> missingPreferredSkills =
                new ArrayList<>();

        int totalRequired = 0;
        int matchedRequired = 0;

        // ---------------------------------------------------------
        // 7. Compare each JD requirement
        // ---------------------------------------------------------

        for (JobRequirement requirement : requirements) {

            if (requirement.getRequirement() == null
                    || requirement.getRequirement().isBlank()) {
                continue;
            }

            String requirementText =
                    requirement.getRequirement().trim();

            String normalizedRequirement =
                    normalize(requirementText);

            // -----------------------------------------------------
            // Layer 1:
            // Exact technology-profile matching
            // -----------------------------------------------------

            boolean exactMatched = isSkillMatched(
                    normalizedRequirement,
                    resumeSkills
            );

            // -----------------------------------------------------
            // Layer 2:
            // Direct resume-text evidence
            // -----------------------------------------------------

            boolean resumeTextMatched =
                    isRequirementSupportedByResumeText(
                            requirementText,
                            resume.getExtractedText()
                    );

            // -----------------------------------------------------
            // Layer 3:
            // PGVector semantic matching
            //
            // Only used when direct evidence does not establish
            // the match.
            // -----------------------------------------------------

            boolean semanticMatched = false;

            if (!exactMatched && !resumeTextMatched) {

                SemanticMatch semanticMatch =
                        findSemanticMatch(
                                requirementText,
                                resume.getId()
                        );

                semanticMatched =
                        semanticMatch.score()
                                >= SEMANTIC_MATCH_THRESHOLD;
            }

            // -----------------------------------------------------
            // Final match decision
            // -----------------------------------------------------

            boolean matched =
                    exactMatched
                            || resumeTextMatched
                            || semanticMatched;

            // -----------------------------------------------------
            // Required requirement
            // -----------------------------------------------------

            if (requirement.getType()
                    == JobRequirementType.REQUIRED) {

                totalRequired++;

                if (matched) {

                    matchedRequired++;

                    addIfAbsent(
                            matchedSkills,
                            requirementText
                    );

                } else {

                    addIfAbsent(
                            missingRequiredSkills,
                            requirementText
                    );
                }
            }

            // -----------------------------------------------------
            // Preferred requirement
            // -----------------------------------------------------

            else if (requirement.getType()
                    == JobRequirementType.PREFERRED) {

                if (matched) {

                    addIfAbsent(
                            matchedSkills,
                            requirementText
                    );

                } else {

                    addIfAbsent(
                            missingPreferredSkills,
                            requirementText
                    );
                }
            }
        }

        // ---------------------------------------------------------
        // 8. Calculate final match score
        //
        // Every requirement that has valid evidence counts as a
        // match.
        //
        // Direct evidence is preferred.
        // Semantic matching is only a fallback.
        // ---------------------------------------------------------

        int matchScore =
                calculateMatchScore(
                        totalRequired,
                        matchedRequired
                );

        // ---------------------------------------------------------
        // 9. Skill gaps
        // ---------------------------------------------------------

        List<String> skillGaps =
                new ArrayList<>();

        skillGaps.addAll(
                missingRequiredSkills
        );

        for (String preferredSkill :
                missingPreferredSkills) {

            addIfAbsent(
                    skillGaps,
                    preferredSkill
            );
        }

        // ---------------------------------------------------------
        // 10. Return result
        // ---------------------------------------------------------

        return new JobMatchResponse(
                resume.getId(),
                jobDescription.getId(),
                matchScore,
                matchedSkills,
                missingRequiredSkills,
                missingPreferredSkills,
                skillGaps
        );
    }

    /**
     * Indexes the extracted resume text in PGVector.
     *
     * Existing vectors for this resume are removed first so
     * repeated matching does not create duplicate documents.
     */
    private void indexResume(Resume resume) {

        String extractedText =
                resume.getExtractedText();

        if (extractedText == null
                || extractedText.isBlank()) {

            throw new IllegalStateException(
                    "Resume does not contain extracted text"
            );
        }

        String filterExpression =
                "entityType == 'RESUME' && resumeId == "
                        + resume.getId();

        embeddingService.deleteByMetadata(
                filterExpression
        );

        List<String> chunks =
                splitIntoChunks(extractedText);

        List<Document> documents =
                new ArrayList<>();

        for (int i = 0;
             i < chunks.size();
             i++) {

            String chunk = chunks.get(i);

            documents.add(
                    new Document(
                            chunk,
                            Map.of(
                                    "entityType",
                                    "RESUME",
                                    "resumeId",
                                    resume.getId(),
                                    "chunkIndex",
                                    i
                            )
                    )
            );
        }

        embeddingService.storeDocuments(
                documents
        );
    }

    /**
     * Searches only the current resume's vector documents
     * for the supplied requirement.
     */
    private SemanticMatch findSemanticMatch(
            String requirement,
            Long resumeId
    ) {

        String filterExpression =
                "entityType == 'RESUME' && resumeId == "
                        + resumeId;

        List<Document> results =
                embeddingService.search(
                        requirement,
                        1,
                        filterExpression
                );

        if (results.isEmpty()) {

            return new SemanticMatch(
                    0.0,
                    null
            );
        }

        Document bestResult =
                results.getFirst();

        Double score =
                bestResult.getScore();

        if (score == null) {

            return new SemanticMatch(
                    0.0,
                    bestResult.getText()
            );
        }

        return new SemanticMatch(
                score,
                bestResult.getText()
        );
    }

    /**
     * Checks whether the requirement is explicitly supported
     * by the extracted resume text.
     *
     * This handles concepts that may not exist as
     * ResumeTechnology records.
     *
     * Examples:
     * - Object-Oriented Programming
     * - Exception Handling
     * - Collections
     * - Multithreading
     * - Database Concepts
     */
    private boolean isRequirementSupportedByResumeText(
            String requirement,
            String resumeText
    ) {

        if (requirement == null
                || requirement.isBlank()
                || resumeText == null
                || resumeText.isBlank()) {

            return false;
        }

        String normalizedResumeText =
                normalize(resumeText);

        String normalizedRequirement =
                normalize(requirement);

        // ---------------------------------------------------------
        // Direct phrase match
        // ---------------------------------------------------------

        if (normalizedResumeText.contains(
                normalizedRequirement
        )) {
            return true;
        }

        // ---------------------------------------------------------
        // Common terminology / aliases
        // ---------------------------------------------------------

        return switch (normalizedRequirement) {

            case "object-oriented programming" ->

                    normalizedResumeText.contains(
                            "object oriented programming"
                    )
                    || normalizedResumeText.contains(
                            "object-oriented programming"
                    )
                    || normalizedResumeText.contains(
                            "oop"
                    );

            case "database concepts" ->

                    normalizedResumeText.contains(
                            "database concepts"
                    )
                    || normalizedResumeText.contains(
                            "database management systems"
                    )
                    || normalizedResumeText.contains(
                            "database management system"
                    )
                    || normalizedResumeText.contains(
                            "dbms"
                    );

            case "exception handling" ->

                    normalizedResumeText.contains(
                            "exception handling"
                    )
                    || normalizedResumeText.contains(
                            "exception handling in java"
                    )
                    || normalizedResumeText.contains(
                            "java exception handling"
                    )
                    || normalizedResumeText.contains(
                            "exceptions in java"
                    )
                    || normalizedResumeText.contains(
                            "java exceptions"
                    );
                    

            default -> false;
        };
    }

    /**
     * Splits resume text into simple chunks for embeddings.
     *
     * This remains intentionally simple because CareerMetric AI
     * is a fresher-focused project.
     */
    private List<String> splitIntoChunks(
            String text
    ) {

        List<String> chunks =
                new ArrayList<>();

        String normalized =
                text.trim()
                        .replaceAll(
                                "\\s+",
                                " "
                        );

        for (int start = 0;
             start < normalized.length();
             start += RESUME_CHUNK_SIZE) {

            int end =
                    Math.min(
                            start + RESUME_CHUNK_SIZE,
                            normalized.length()
                    );

            String chunk =
                    normalized.substring(
                            start,
                            end
                    ).trim();

            if (!chunk.isBlank()) {
                chunks.add(chunk);
            }
        }

        return chunks;
    }

    /**
     * Exact normalized/containment matching.
     */
    private boolean isSkillMatched(
            String requirement,
            Set<String> resumeSkills
    ) {

        if (resumeSkills.contains(
                requirement
        )) {
            return true;
        }

        for (String resumeSkill :
                resumeSkills) {

            if (resumeSkill.equals(
                    requirement
            )) {
                return true;
            }

            if (resumeSkill.contains(
                    requirement
            )
                    || requirement.contains(
                    resumeSkill
            )) {
                return true;
            }
        }

        return false;
    }

    /**
     * Calculates the final required-skill match score.
     *
     * Semantic matching is a fallback mechanism, so once a
     * requirement has valid direct or semantic evidence, it
     * contributes to the final requirement coverage.
     */
    private int calculateMatchScore(
            int totalRequired,
            int matchedRequired
    ) {

        if (totalRequired == 0) {
            return 0;
        }

        return Math.round(
                ((float) matchedRequired
                        / totalRequired)
                        * 100
        );
    }

    private void addIfAbsent(
            List<String> list,
            String value
    ) {

        if (!list.contains(value)) {
            list.add(value);
        }
    }

    private String normalize(
            String value
    ) {

        return value
                .toLowerCase(Locale.ROOT)
                .trim()
                .replaceAll(
                        "\\s+",
                        " "
                );
    }

    private record SemanticMatch(
            double score,
            String matchedText
    ) {
    }
}