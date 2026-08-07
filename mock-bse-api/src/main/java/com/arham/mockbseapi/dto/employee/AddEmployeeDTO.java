package com.arham.mockbseapi.dto.employee;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AddEmployeeDTO {

    @NotBlank(message = "employee code is required")
    private String employeeCode;

    @NotBlank(message = "employee name is required")
    private String name;

    @NotBlank(message = "employee email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "mobile is required")
    private String mobile;
}