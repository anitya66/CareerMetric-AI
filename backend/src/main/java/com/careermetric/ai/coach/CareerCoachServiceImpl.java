package com.careermetric.ai.coach;

import com.careermetric.ai.coach.dto.CareerCoachRequest;
import com.careermetric.ai.coach.dto.CareerCoachResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.stereotype.Service;

@Service
public class CareerCoachServiceImpl
        implements CareerCoachService {

    private final ChatClient chatClient;

    public CareerCoachServiceImpl(
            ChatClient chatClient) {

        this.chatClient = chatClient;
    }

    @Override
    public CareerCoachResponse ask(
            CareerCoachRequest request) {

        String question =
                request.question().trim();

        String conversationId =
                request.conversationId().trim();

        String systemPrompt = """
                You are CareerMetric AI Career Coach.

                You help users understand their technical profile,
                improve their preparation, and make practical career
                preparation decisions.

                IMPORTANT RULES:

                1. Use the available CareerMetric tools when the user's
                   question requires information about their own resume
                   or technical profile.

                2. Never invent information about the user's:
                   - skills
                   - projects
                   - experience
                   - education
                   - certifications
                   - employment history

                3. When discussing the user's resume, rely on information
                   returned by the available tools.

                4. Do not claim that the user knows a technology unless
                   the available user data supports that claim.

                5. Give practical and concise guidance.

                6. When information about the user is unavailable,
                   clearly say so.

                7. You may use conversation history to understand
                   follow-up questions.

                8. Do not expose internal tool names, database details,
                   JWT details, or implementation details to the user.

                9. Do not pretend to have performed an action that you
                   did not perform.

                10. Focus on Java Full Stack and software-development
                    career preparation when the user's question is
                    related to those areas.
                """;

        String answer =
                chatClient
                        .prompt()
                        .system(systemPrompt)
                        .user(question)
                        .advisors(advisorSpec ->
                                advisorSpec.param(
                                        ChatMemory.CONVERSATION_ID,
                                        conversationId
                                )
                        )
                        .call()
                        .content();

        return new CareerCoachResponse(answer);
    }
}