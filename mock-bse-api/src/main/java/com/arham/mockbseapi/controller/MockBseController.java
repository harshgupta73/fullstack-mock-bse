package com.arham.mockbseapi.controller;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import com.arham.mockbseapi.dto.client.GetClientDTO;
import com.arham.mockbseapi.dto.trade.GetTradeDTO;
import com.arham.mockbseapi.service.MockBseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/bse")
@RequiredArgsConstructor
public class MockBseController {

    private final MockBseService mockBseService;

    @GetMapping("/clients")
    public Page<GetClientDTO> getClients(

            @RequestParam(defaultValue = "0") int pageNumber,

            @RequestParam(defaultValue = "5") int pageSize,

            @RequestParam(defaultValue = "id") String sortBy,

            @RequestParam(defaultValue = "asc") String sortDirection) {

        return mockBseService.getClients(
                pageNumber,
                pageSize,
                sortBy,
                sortDirection);
    }

    @GetMapping("/trades")
    public Page<GetTradeDTO> getTrades(

            @RequestParam(required = false) Long clientId,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate startDate,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate,

            @RequestParam(defaultValue = "0") int pageNumber,

            @RequestParam(defaultValue = "5") int pageSize,

            @RequestParam(defaultValue = "id") String sortBy,

            @RequestParam(defaultValue = "asc") String sortDirection) {

        return mockBseService.getTrades(
                clientId,
                startDate,
                endDate,
                pageNumber,
                pageSize,
                sortBy,
                sortDirection);
    }
    
    @PostMapping("/sync")
    public String syncBse() {

        mockBseService.syncBse();

        return "BSE sync completed successfully.";
    }

}