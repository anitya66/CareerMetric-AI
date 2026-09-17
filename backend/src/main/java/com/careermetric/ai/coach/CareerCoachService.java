package com.careermetric.ai.coach;

import com.careermetric.ai.coach.dto.CareerCoachRequest;
import com.careermetric.ai.coach.dto.CareerCoachResponse;

public interface CareerCoachService {

    CareerCoachResponse ask(
            CareerCoachRequest request
    );
}