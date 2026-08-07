package com.arham.mockbseapi.dto.sse;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SseEventDTO {

    private String type;
    private String message;
    private LocalDateTime timestamp;

}