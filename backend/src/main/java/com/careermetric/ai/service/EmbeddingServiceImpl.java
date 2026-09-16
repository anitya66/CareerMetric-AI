package com.careermetric.ai.service;

import org.springframework.ai.document.Document;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class EmbeddingServiceImpl implements EmbeddingService {

    private final EmbeddingModel embeddingModel;
    private final VectorStore vectorStore;

    public EmbeddingServiceImpl(
            EmbeddingModel embeddingModel,
            VectorStore vectorStore) {

        this.embeddingModel = embeddingModel;
        this.vectorStore = vectorStore;
    }

    @Override
    public float[] generateEmbedding(String text) {

        validateText(text);

        return embeddingModel.embed(text);
    }

    @Override
    public Document store(
            String text,
            Map<String, Object> metadata) {

        validateText(text);

        Document document = new Document(
                text,
                metadata == null ? Map.of() : metadata
        );

        vectorStore.add(List.of(document));

        return document;
    }

    @Override
    public void storeDocuments(List<Document> documents) {

        if (documents == null || documents.isEmpty()) {
            return;
        }

        vectorStore.add(documents);
    }

    @Override
    public void deleteByMetadata(String filterExpression) {

        if (filterExpression == null
                || filterExpression.isBlank()) {
            throw new IllegalArgumentException(
                    "Filter expression must not be blank"
            );
        }

        vectorStore.delete(
                new org.springframework.ai.vectorstore.filter.FilterExpressionTextParser()
                        .parse(filterExpression)
        );
    }

    @Override
    public List<Document> search(
            String query,
            int topK) {

        return search(query, topK, null);
    }

    @Override
    public List<Document> search(
            String query,
            int topK,
            String filterExpression) {

        validateText(query);

        if (topK <= 0) {
            throw new IllegalArgumentException(
                    "topK must be greater than zero"
            );
        }

        SearchRequest.Builder builder =
                SearchRequest.builder()
                        .query(query)
                        .topK(topK);

        if (filterExpression != null
                && !filterExpression.isBlank()) {

            builder.filterExpression(filterExpression);
        }

        return vectorStore.similaritySearch(
                builder.build()
        );
    }

    private void validateText(String text) {

        if (text == null || text.isBlank()) {
            throw new IllegalArgumentException(
                    "Text must not be blank"
            );
        }
    }
}