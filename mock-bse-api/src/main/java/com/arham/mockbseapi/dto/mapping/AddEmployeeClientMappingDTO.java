package com.arham.mockbseapi.dto.mapping;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddEmployeeClientMappingDTO {

    @NotNull(message = "employee id is required")
    private Long employeeId;

    @NotNull(message = "Client id is required")
    private Long clientId;

}