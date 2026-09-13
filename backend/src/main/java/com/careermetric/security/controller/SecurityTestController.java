package com.careermetric.security.controller;

import com.careermetric.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/security")
@SecurityRequirement(name = "bearerAuth")
public class SecurityTestController {

    @GetMapping("/me")
    public ApiResponse<String> me(
            Authentication authentication
    ) {

        return ApiResponse.success(
                "Authenticated successfully",
                authentication.getName()
        );
    }
}