package com.careermetric.ai.tool;

import com.careermetric.resume.entity.Resume;
import com.careermetric.skill.entity.ResumeTechnology;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CareerMetricTools {

    private final ToolService toolService;

    public CareerMetricTools(ToolService toolService) {
        this.toolService = toolService;
    }

    @Tool(
            name = "get_current_user_resume_technologies",
            description = """
                    Get the technologies extracted from the authenticated
                    user's resume.

                    Use this tool when the user asks about:
                    - technologies in their resume
                    - their current technical stack
                    - technologies they have listed
                    - their extracted resume skills
                    """
    )
    public String getCurrentUserResumeTechnologies() {

        System.out.println(
                ">>> AI TOOL CALLED: get_current_user_resume_technologies"
        );

        List<ResumeTechnology> technologies =
                toolService.getCurrentUserResumeTechnologies();

        if (technologies.isEmpty()) {
            return "No technologies have been extracted from the user's resume.";
        }

        return technologies.stream()
                .map(resumeTechnology -> {

                    String technologyName =
                            resumeTechnology
                                    .getTechnology()
                                    .getName();

                    String evidence =
                            resumeTechnology.getEvidence();

                    if (evidence == null || evidence.isBlank()) {
                        return technologyName;
                    }

                    return technologyName
                            + " — Evidence: "
                            + evidence;
                })
                .collect(Collectors.joining("\n"));
    }

    @Tool(
            name = "get_current_user_resume_summary",
            description = """
                    Get the authenticated user's latest resume information.

                    Use this tool when the user asks to:
                    - summarize their resume
                    - describe their resume
                    - explain their resume background
                    - identify projects or experience mentioned in their resume
                    - understand what their resume contains

                    Use only information returned by this tool.
                    Do not invent experience, skills, projects, education,
                    certifications, or employment history.
                    """
    )
    public String getCurrentUserResumeSummary() {

        System.out.println(
                ">>> AI TOOL CALLED: get_current_user_resume_summary"
        );

        Resume resume =
                toolService.getCurrentUserLatestResume();

        if (resume == null) {
            return "No resume is available for the authenticated user.";
        }

        StringBuilder result = new StringBuilder();

        result.append("RESUME FILE: ")
                .append(resume.getFileName())
                .append("\n");

        result.append("FILE TYPE: ")
                .append(resume.getFileType())
                .append("\n");

        result.append("STATUS: ")
                .append(resume.getStatus())
                .append("\n");

        result.append("EXTRACTED RESUME TEXT:\n");

        String extractedText =
                resume.getExtractedText();

        if (extractedText == null || extractedText.isBlank()) {

            result.append(
                    "No extracted resume text is available."
            );

        } else {

            result.append(
                    limitText(extractedText, 12000)
            );
        }

        return result.toString();
    }

    private String limitText(
            String text,
            int maxLength) {

        if (text.length() <= maxLength) {
            return text;
        }

        return text.substring(0, maxLength)
                + "\n[Resume text truncated by tool]";
    }
}