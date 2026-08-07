package com.arham.mockbseapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arham.mockbseapi.entity.EmployeeClientMapping;

public interface EmployeeClientMappingRepository
        extends JpaRepository<EmployeeClientMapping, Long> {

    boolean existsByEmployeeIdAndClientId(Long employeeId, Long clientId);
    
    boolean existsByClientId(Long clientId);
    
    List<EmployeeClientMapping> findByEmployeeId(Long employeeId);
}