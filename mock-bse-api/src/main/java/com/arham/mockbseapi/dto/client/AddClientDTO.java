package com.arham.mockbseapi.dto.client;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AddClientDTO {

    @NotBlank(message = "Client code is required")
    private String clientCode;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank
    private String panNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "email must be valid")
    private String email;

    @NotBlank(message = "Mobile is required")
    private String mobile;
}