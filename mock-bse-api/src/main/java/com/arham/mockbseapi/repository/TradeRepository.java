package com.arham.mockbseapi.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.arham.mockbseapi.entity.Trade;

public interface TradeRepository extends JpaRepository<Trade, Long> {
	
	List<Trade> findByClientId(Long clientId); //used by EmployeeService class

    Page<Trade> findByClientId(Long clientId, Pageable pageable); //used by TradeService Class

    Page<Trade> findByTradeDateBetween(LocalDate startDate,
                                       LocalDate endDate,
                                       Pageable pageable);

    Page<Trade> findByClientIdAndTradeDateBetween(Long clientId,
                                                  LocalDate startDate,
                                                  LocalDate endDate,
                                                  Pageable pageable);

}