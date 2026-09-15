package com.careermetric.assessment.service;

import com.careermetric.assessment.dto.AssessmentDetailResponse;
import com.careermetric.assessment.dto.AssessmentResponse;
import com.careermetric.assessment.dto.CreateAssessmentRequest;

import java.util.List;

public interface AssessmentService {

    AssessmentResponse createAssessment(
            CreateAssessmentRequest request
    );

    List<AssessmentResponse> getMyAssessments();

    AssessmentDetailResponse getMyAssessment(
            Long assessmentId
    );
}