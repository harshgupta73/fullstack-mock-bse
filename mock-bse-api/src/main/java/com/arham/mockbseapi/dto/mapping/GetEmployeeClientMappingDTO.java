package com.arham.mockbseapi.dto.mapping;

import lombok.Data;

@Data
public class GetEmployeeClientMappingDTO {

    private Long id;

    private Long employeeId;
    private String employeeCode;

    private Long clientId;
    private String clientCode;

}