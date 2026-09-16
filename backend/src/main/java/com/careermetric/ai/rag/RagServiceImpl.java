package com.careermetric.ai.rag;

import com.careermetric.ai.rag.dto.RagResponse;
import com.careermetric.ai.rag.dto.RagSource;
import com.careermetric.knowledge.service.KnowledgeRetrievalService;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.document.Document;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RagServiceImpl implements RagService {

    private final ChatClient chatClient;
    private final KnowledgeRetrievalService retrievalService;

    public RagServiceImpl(
            ChatClient chatClient,
            KnowledgeRetrievalService retrievalService) {

        this.chatClient = chatClient;
        this.retrievalService = retrievalService;
    }

    @Override
    public RagResponse ask(String question) {

        if (question == null || question.isBlank()) {
            throw new IllegalArgumentException("Question is required");
        }

        String cleanQuestion = question.trim();

        List<Document> documents =
                retrievalService.search(cleanQuestion, 3);

        String context = documents.stream()
                .map(Document::getText)
                .reduce((first, second) ->
                        first + "\n\n---\n\n" + second)
                .orElse("");

        if (context.isBlank()) {
            context = "No relevant knowledge was retrieved.";
        }

        String systemPrompt = """
                You are CareerMetric AI, an AI career and technical learning assistant.

                Answer the user's question using ONLY the provided knowledge context.

                Grounding rules:

                1. Treat the provided knowledge context as the only source of truth.
                2. Do not use outside knowledge to fill missing information.
                3. Do not invent facts, examples, explanations, or details that are not
                   supported by the provided context.
                4. If the context does not contain enough information to answer the
                   question, clearly say that the available knowledge base does not
                   contain enough information.
                5. Give a clear and useful answer.
                6. Use examples only when they are supported by the context.
                """;

        String userPrompt = """
                KNOWLEDGE CONTEXT:

                %s

                USER QUESTION:

                %s
                """.formatted(context, cleanQuestion);

        String answer = chatClient
                .prompt()
                .system(systemPrompt)
                .user(userPrompt)
                .call()
                .content();

        List<RagSource> sources = documents.stream()
                .map(document -> {

                    Object title = document.getMetadata().get("title");
                    Object topic = document.getMetadata().get("topic");

                    return new RagSource(
                            title != null ? title.toString() : "Unknown",
                            topic != null ? topic.toString() : "Unknown"
                    );
                })
                .distinct()
                .toList();

        return new RagResponse(
                answer,
                sources
        );
    }
}