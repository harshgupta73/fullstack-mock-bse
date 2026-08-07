package com.arham.mockbseapi.service;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.arham.mockbseapi.dto.trade.AddTradeDTO;
import com.arham.mockbseapi.dto.trade.GetTradeDTO;
import com.arham.mockbseapi.dto.trade.UpdateTradeDTO;
import com.arham.mockbseapi.entity.Client;
import com.arham.mockbseapi.entity.Trade;
import com.arham.mockbseapi.exception.ResourceNotFoundException;
import com.arham.mockbseapi.mapper.TradeMapper;
import com.arham.mockbseapi.repository.ClientRepository;
import com.arham.mockbseapi.repository.TradeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TradeService {

    private final TradeRepository tradeRepository;
    private final ClientRepository clientRepository;
    private final TradeMapper tradeMapper;

    public GetTradeDTO addTrade(AddTradeDTO dto) {

        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Client not found."));

        Trade trade = tradeMapper.toEntity(dto);

        trade.setClient(client);

        trade = tradeRepository.save(trade);

        return tradeMapper.toDTO(trade);
    }

    public Page<GetTradeDTO> getAllTrades(Long clientId,
                                          LocalDate startDate,
                                          LocalDate endDate,
                                          int pageNumber,
                                          int pageSize,
                                          String sortBy,
                                          String sortDirection) {
    	
    	if ((startDate != null && endDate == null)
    	        || (startDate == null && endDate != null)) {

    	    throw new IllegalArgumentException(
    	            "Both startDate and endDate must be provided together.");
    	}
    	
        Sort sort = sortDirection.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        if (clientId != null && startDate != null && endDate != null) {

            return tradeRepository
                    .findByClientIdAndTradeDateBetween(
                            clientId,
                            startDate,
                            endDate,
                            pageable)
                    .map(tradeMapper::toDTO);
        }

        if (clientId != null) {

            return tradeRepository
                    .findByClientId(clientId, pageable)
                    .map(tradeMapper::toDTO);
        }

        if (startDate != null && endDate != null) {

            return tradeRepository
                    .findByTradeDateBetween(
                            startDate,
                            endDate,
                            pageable)
                    .map(tradeMapper::toDTO);
        }

        return tradeRepository
                .findAll(pageable)
                .map(tradeMapper::toDTO);
    }

    public GetTradeDTO getTradeById(Long id) {

        Trade trade = tradeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Trade not found."));

        return tradeMapper.toDTO(trade);
    }

    public GetTradeDTO updateTrade(Long id,
                                   UpdateTradeDTO dto) {

        Trade trade = tradeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Trade not found."));

        tradeMapper.updateTrade(dto, trade);

        trade = tradeRepository.save(trade);

        return tradeMapper.toDTO(trade);
    }

    public void deleteTrade(Long id) {

        Trade trade = tradeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Trade not found."));

        tradeRepository.delete(trade);
    }

}