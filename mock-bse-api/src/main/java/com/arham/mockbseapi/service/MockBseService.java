package com.arham.mockbseapi.service;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.arham.mockbseapi.dto.client.GetClientDTO;
import com.arham.mockbseapi.dto.trade.GetTradeDTO;
import com.arham.mockbseapi.sse.SseService;
import com.arham.mockbseapi.util.DelayUtil;
import com.arham.mockbseapi.util.FailureUtil;

import lombok.RequiredArgsConstructor;
import java.time.LocalDateTime;
import com.arham.mockbseapi.dto.sse.SseEventDTO;


@Service
@RequiredArgsConstructor
public class MockBseService {

    private final ClientService clientService;
    private final TradeService tradeService;
    private final DelayUtil delayUtil;
    private final FailureUtil failureUtil;
    private final SseService sseService;

    public Page<GetClientDTO> getClients(int pageNumber,
                                         int pageSize,
                                         String sortBy,
                                         String sortDirection) {

        // Simulate pulling data from BSE
        delayUtil.simulateHalfDelay();

        // Simulate random network failure
        failureUtil.randomFailure();

        // Remaining pull time
        delayUtil.simulateHalfDelay();

        Page<GetClientDTO> clients = clientService.getAllClients(
                pageNumber,
                pageSize,
                sortBy,
                sortDirection);


        return clients;
    }

    public Page<GetTradeDTO> getTrades(Long clientId,
                                       LocalDate startDate,
                                       LocalDate endDate,
                                       int pageNumber,
                                       int pageSize,
                                       String sortBy,
                                       String sortDirection) {

        // Simulate pulling data from BSE
        delayUtil.simulateHalfDelay();

        // Simulate random network failure
        failureUtil.randomFailure();

        // Remaining pull time
        delayUtil.simulateHalfDelay();

        Page<GetTradeDTO> trades = tradeService.getAllTrades(
                clientId,
                startDate,
                endDate,
                pageNumber,
                pageSize,
                sortBy,
                sortDirection);


        return trades;
    }
    
    public void syncBse() {

        // Simulate BSE delay
        delayUtil.simulateHalfDelay();

        // Simulate random failure
        failureUtil.randomFailure();

        // Simulate remaining delay
        delayUtil.simulateHalfDelay();

        // Notify all connected React clients
        sseService.sendUpdate(
                new SseEventDTO(
                        "BSE_DATA_UPDATED",
                        "Fresh BSE data available",
                        LocalDateTime.now()
                )
        );
    }

}