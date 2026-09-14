package com.careermetric.resume.controller;

import com.careermetric.common.dto.ApiResponse;
import com.careermetric.resume.dto.ResumeDetailResponse;
import com.careermetric.resume.dto.ResumeResponse;
import com.careermetric.resume.service.ResumeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
@SecurityRequirement(name = "bearerAuth")
@Tag(
        name = "Resumes",
        description = "Resume management endpoints"
)
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(
            ResumeService resumeService
    ) {
        this.resumeService = resumeService;
    }

    @PostMapping(consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
            summary = "Upload a resume",
            description = "Uploads a PDF or DOCX resume for the authenticated user"
    )
    public ApiResponse<ResumeResponse> uploadResume(
            @RequestParam("file") MultipartFile file
    ) {

        ResumeResponse response =
                resumeService.uploadResume(file);

        return ApiResponse.success(
                "Resume uploaded successfully",
                response
        );
    }

    @GetMapping
    @Operation(
            summary = "Get my resumes",
            description = "Returns all resumes belonging to the authenticated user"
    )
    public ApiResponse<List<ResumeResponse>> getMyResumes() {

        return ApiResponse.success(
                "Resumes retrieved successfully",
                resumeService.getMyResumes()
        );
    }

    @GetMapping("/{resumeId}")
    @Operation(
            summary = "Get my resume",
            description = "Returns a specific resume belonging to the authenticated user"
    )
    public ApiResponse<ResumeDetailResponse> getMyResume(
            @PathVariable Long resumeId
    ) {

        return ApiResponse.success(
                "Resume retrieved successfully",
                resumeService.getMyResume(resumeId)
        );
    }

    @DeleteMapping("/{resumeId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(
            summary = "Delete my resume",
            description = "Deletes a resume belonging to the authenticated user"
    )
    public ApiResponse<Void> deleteMyResume(
            @PathVariable Long resumeId
    ) {

        resumeService.deleteMyResume(resumeId);

        return ApiResponse.success(
                "Resume deleted successfully",
                null
        );
    }
}