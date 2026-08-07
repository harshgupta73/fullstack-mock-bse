package com.arham.mockbseapi.dto.client;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateClientDTO {

    @NotBlank(message = "name is required")
    private String name;

    @NotBlank(message = "Pan number is required")
    private String panNumber;

    @NotBlank(message = "email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "mobile is required")
    private String mobile;
}