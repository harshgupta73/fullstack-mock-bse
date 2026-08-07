package com.arham.mockbseapi.dto.employee;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateEmployeeDTO {

    @NotBlank(message = "employee name is required")
    private String name;

    @NotBlank(message = "employee email is required")
    @Email(message = "email must be valid")
    private String email;

    @NotBlank(message = "mobile is required")
    private String mobile;
}