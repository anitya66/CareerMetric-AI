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
        return generateAnswer(question, null);
    }

    @Override
    public RagResponse ask(String question, String topic) {
        return generateAnswer(question, topic);
    }

    private RagResponse generateAnswer(
            String question,
            String topic) {

        if (question == null || question.isBlank()) {
            throw new IllegalArgumentException("Question is required");
        }

        String cleanQuestion = question.trim();

        List<Document> documents;

        if (topic == null || topic.isBlank()) {

            documents = retrievalService.search(
                    cleanQuestion,
                    3
            );

        } else {

            documents = retrievalService.search(
                    cleanQuestion,
                    3,
                    topic.trim()
            );
        }

        String context = buildContext(documents);

        String systemPrompt = """
                You are CareerMetric AI, an AI career and technical learning assistant.

                Your task is to answer the user's question using the provided
                knowledge sources.

                STRICT GROUNDING RULES:

                1. Use the provided knowledge sources as the only factual basis
                   for your answer.

                2. Do not use your own general knowledge to fill gaps in the
                   retrieved context.

                3. Do not invent facts, explanations, examples, code, or
                   definitions.

                4. If the provided sources do not contain enough information
                   to answer the question, explicitly state that the available
                   knowledge base does not contain enough information.

                5. Do not assume that a source contains information merely
                   because its title or topic appears relevant.

                6. When multiple sources are provided, combine them only when
                   their content supports the answer.

                7. Give a concise but technically useful answer.

                8. Use examples only when they are directly supported by the
                   retrieved sources.
                """;

        String userPrompt = """
                RETRIEVED KNOWLEDGE SOURCES:

                %s

                USER QUESTION:

                %s

                Answer the question using only the retrieved knowledge
                sources above.
                """.formatted(
                context,
                cleanQuestion
        );

        String answer = chatClient
                .prompt()
                .system(systemPrompt)
                .user(userPrompt)
                .call()
                .content();

        List<RagSource> sources = documents.stream()
                .map(document -> {

                    Object title =
                            document.getMetadata().get("title");

                    Object documentTopic =
                            document.getMetadata().get("topic");

                    return new RagSource(
                            title != null
                                    ? title.toString()
                                    : "Unknown",
                            documentTopic != null
                                    ? documentTopic.toString()
                                    : "Unknown"
                    );
                })
                .distinct()
                .toList();

        return new RagResponse(
                answer,
                sources
        );
    }

    private String buildContext(List<Document> documents) {

        if (documents.isEmpty()) {
            return "No relevant knowledge was retrieved.";
        }

        StringBuilder context = new StringBuilder();

        for (int i = 0; i < documents.size(); i++) {

            Document document = documents.get(i);

            Object title =
                    document.getMetadata().get("title");

            Object topic =
                    document.getMetadata().get("topic");

            context.append("SOURCE ")
                    .append(i + 1)
                    .append("\n");

            context.append("TITLE: ")
                    .append(title != null
                            ? title
                            : "Unknown")
                    .append("\n");

            context.append("TOPIC: ")
                    .append(topic != null
                            ? topic
                            : "Unknown")
                    .append("\n");

            context.append("CONTENT:\n")
                    .append(document.getText())
                    .append("\n");

            context.append("\n--------------------\n\n");
        }

        return context.toString();
    }
}