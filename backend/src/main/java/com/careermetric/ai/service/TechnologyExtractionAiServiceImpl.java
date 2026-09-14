package com.careermetric.ai.service;

import com.careermetric.ai.dto.TechnologyExtractionAiResult;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class TechnologyExtractionAiServiceImpl
        implements TechnologyExtractionAiService {

    private final ChatClient chatClient;

    public TechnologyExtractionAiServiceImpl(
            ChatClient chatClient
    ) {
        this.chatClient = chatClient;
    }

    @Override
    public TechnologyExtractionAiResult extractTechnologies(
            String resumeText
    ) {

        return chatClient
                .prompt()
                .system("""
                        You extract technologies from resumes.

                        Extract only technologies explicitly supported
                        by the resume.

                        Never invent technologies.

                        Do not confuse:
                        - Java and JavaScript
                        - Spring and Spring Boot
                        - SQL and MySQL
                        - HTML and React
                        - REST and Spring Boot

                        Do not extract soft skills or generic concepts.

                        Every extracted technology must have evidence
                        from the resume.

                        Use one of these categories:

                        PROGRAMMING_LANGUAGE
                        BACKEND
                        FRONTEND
                        DATABASE
                        SECURITY
                        DEVOPS
                        CLOUD
                        TESTING
                        BUILD_TOOL
                        VERSION_CONTROL
                        AI_ML
                        OTHER
                        """)
                .user(user -> user
                        .text("""
                                Extract the technologies from this resume.

                                Resume:
                                {resumeText}
                                """)
                        .param("resumeText", resumeText))
                .call()
                .entity(
                        TechnologyExtractionAiResult.class,
                        spec -> spec
                                .useProviderStructuredOutput()
                                .validateSchema()
                );
    }
}