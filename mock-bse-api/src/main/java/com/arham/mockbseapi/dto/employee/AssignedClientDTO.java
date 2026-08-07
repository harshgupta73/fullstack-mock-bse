package com.arham.mockbseapi.dto.employee;

import lombok.Data;

@Data
public class AssignedClientDTO {

    private Long id;
    private String clientCode;
    private String name;
    private String email;
    private String mobile;

}