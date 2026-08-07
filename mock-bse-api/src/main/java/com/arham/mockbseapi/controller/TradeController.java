package com.arham.mockbseapi.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.arham.mockbseapi.dto.trade.*;
import com.arham.mockbseapi.service.TradeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;


@RestController
@RequestMapping("/trades")
@RequiredArgsConstructor
public class TradeController {

    private final TradeService tradeService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GetTradeDTO addTrade(@Valid @RequestBody AddTradeDTO dto) {
        return tradeService.addTrade(dto);
    }

    @GetMapping
    public Page<GetTradeDTO> getAllTrades(

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

        return tradeService.getAllTrades(
                clientId,
                startDate,
                endDate,
                pageNumber,
                pageSize,
                sortBy,
                sortDirection);
    }

    @GetMapping("/{id}")
    public GetTradeDTO getTradeById(@PathVariable Long id) {
        return tradeService.getTradeById(id);
    }

    @PutMapping("/{id}")
    public GetTradeDTO updateTrade(@PathVariable Long id,
                                   @Valid @RequestBody UpdateTradeDTO dto) {

        return tradeService.updateTrade(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTrade(@PathVariable Long id) {
        tradeService.deleteTrade(id);
    }

}