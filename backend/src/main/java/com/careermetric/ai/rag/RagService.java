package com.careermetric.ai.rag;

import com.careermetric.ai.rag.dto.RagResponse;

public interface RagService {

    RagResponse ask(String question);

    RagResponse ask(String question, String topic);
}