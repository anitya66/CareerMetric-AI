package com.careermetric.knowledge.service;

import com.careermetric.ai.service.EmbeddingService;
import org.springframework.ai.document.Document;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KnowledgeRetrievalServiceImpl
        implements KnowledgeRetrievalService {

    private final EmbeddingService embeddingService;

    public KnowledgeRetrievalServiceImpl(
            EmbeddingService embeddingService
    ) {
        this.embeddingService = embeddingService;
    }

    @Override
    public List<Document> search(
            String query,
            int topK
    ) {

        validateQuery(query);

        return embeddingService.search(
                query.trim(),
                topK,
                "entityType == 'KNOWLEDGE'"
        );
    }

    @Override
    public List<Document> search(
            String query,
            int topK,
            String topic
    ) {

        validateQuery(query);

        if (topic == null || topic.isBlank()) {
            return search(query, topK);
        }

        String filterExpression =
                "entityType == 'KNOWLEDGE' && topic == '"
                        + escapeFilterValue(topic.trim())
                        + "'";

        return embeddingService.search(
                query.trim(),
                topK,
                filterExpression
        );
    }

    private void validateQuery(String query) {

        if (query == null || query.isBlank()) {
            throw new IllegalArgumentException(
                    "Search query is required"
            );
        }
    }

    private String escapeFilterValue(
            String value
    ) {

        return value.replace(
                "'",
                "''"
        );
    }
}