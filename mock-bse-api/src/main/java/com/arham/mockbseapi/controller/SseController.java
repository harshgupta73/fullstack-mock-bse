package com.arham.mockbseapi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.arham.mockbseapi.sse.SseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class SseController {

    private final SseService sseService;

    @GetMapping("/events")
    public SseEmitter subscribe() {

        return sseService.subscribe();

    }

}