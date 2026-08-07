package com.arham.mockbseapi.dto.employee;

import lombok.Data;

@Data
public class GetEmployeeDTO {

    private Long id;

    private String employeeCode;

    private String name;

    private String email;

    private String mobile;
}