package com.arham.mockbseapi.dto.employee;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class EmployeeBrokerageDTO {

    private Long employeeId;
    private String employeeCode;
    private BigDecimal totalBrokerage;

}