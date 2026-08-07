package com.arham.mockbseapi.dto.trade;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Data;

@Data
public class GetTradeDTO {

    private Long id;

    private String stockName;

    private Integer quantity;

    private BigDecimal price;

    private BigDecimal brokerage;

    private LocalDate tradeDate;

    private Long clientId;

    private String clientCode;
}