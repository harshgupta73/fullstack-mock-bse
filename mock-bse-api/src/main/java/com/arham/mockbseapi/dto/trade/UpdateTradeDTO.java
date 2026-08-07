package com.arham.mockbseapi.dto.trade;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UpdateTradeDTO {

    @NotBlank(message = "stock name is required")
    private String stockName;

    @NotNull(message = "quantity name is required")
    @Positive(message = "quantity must be positive integer")
    private Integer quantity;

    @NotNull(message = "price is required")
    @Positive(message = "price must be positive integer")
    private BigDecimal price;

    @NotNull(message = "borkerage is required")
    @Positive(message = "brokerage must be positive integer")
    private BigDecimal brokerage;

    @NotNull(message = "trade date is required")
    private LocalDate tradeDate;
}