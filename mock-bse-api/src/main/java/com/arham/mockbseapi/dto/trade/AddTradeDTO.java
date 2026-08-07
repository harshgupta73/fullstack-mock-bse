package com.arham.mockbseapi.dto.trade;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class AddTradeDTO {

    @NotBlank(message = "stock name is required")
    private String stockName;

    @NotNull(message = "quantity is required")
    @Positive(message = "number must be positive integer")
    private Integer quantity;

    @NotNull(message = "price cannot be empty")
    @Positive
    private BigDecimal price;

    @NotNull(message = "borkerage cannot be empty")
    @Positive
    private BigDecimal brokerage;

    @NotNull(message = "tradedate cannot be null")
    private LocalDate tradeDate;

    @NotNull(message = "cliend it cannot be null")
    private Long clientId;
}