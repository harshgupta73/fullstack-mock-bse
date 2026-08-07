package com.arham.mockbseapi.dto.client;

import lombok.Data;

@Data
public class GetClientDTO {

    private Long id;
    private String clientCode;
    private String name;
    private String panNumber;
    private String email;
    private String mobile;
}