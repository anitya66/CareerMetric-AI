package com.careermetric.assessment.controller;

import com.careermetric.assessment.dto.AssessmentDetailResponse;
import com.careermetric.assessment.dto.AssessmentResponse;
import com.careermetric.assessment.dto.CreateAssessmentRequest;
import com.careermetric.assessment.service.AssessmentService;
import com.careermetric.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessments")
@SecurityRequirement(name = "bearerAuth")
public class AssessmentController {

    private final AssessmentService assessmentService;

    public AssessmentController(
            AssessmentService assessmentService
    ) {
        this.assessmentService =
                assessmentService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AssessmentResponse>>
    createAssessment(
            @Valid
            @RequestBody
            CreateAssessmentRequest request
    ) {

        AssessmentResponse assessment =
                assessmentService.createAssessment(
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                "Assessment created successfully",
                                assessment
                        )
                );
    }

    @GetMapping
    public ResponseEntity<
            ApiResponse<List<AssessmentResponse>>
            >
    getMyAssessments() {

        List<AssessmentResponse> assessments =
                assessmentService.getMyAssessments();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Assessments fetched successfully",
                        assessments
                )
        );
    }

    @GetMapping("/{assessmentId}")
    public ResponseEntity<
            ApiResponse<AssessmentDetailResponse>
            >
    getMyAssessment(
            @PathVariable Long assessmentId
    ) {

        AssessmentDetailResponse assessment =
                assessmentService.getMyAssessment(
                        assessmentId
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Assessment fetched successfully",
                        assessment
                )
        );
    }
}