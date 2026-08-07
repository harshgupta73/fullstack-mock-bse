package com.arham.mockbseapi.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.arham.mockbseapi.dto.employee.AddEmployeeDTO;
import com.arham.mockbseapi.dto.employee.AssignedClientDTO;
import com.arham.mockbseapi.dto.employee.GetEmployeeDTO;
import com.arham.mockbseapi.dto.employee.UpdateEmployeeDTO;
import com.arham.mockbseapi.dto.trade.GetTradeDTO;
import com.arham.mockbseapi.entity.Employee;
import com.arham.mockbseapi.entity.EmployeeClientMapping;
import com.arham.mockbseapi.entity.Trade;
import com.arham.mockbseapi.exception.DuplicateResourceException;
import com.arham.mockbseapi.exception.ResourceNotFoundException;
import com.arham.mockbseapi.mapper.ClientMapper;
import com.arham.mockbseapi.mapper.EmployeeMapper;
import com.arham.mockbseapi.mapper.TradeMapper;
import com.arham.mockbseapi.repository.EmployeeClientMappingRepository;
import com.arham.mockbseapi.repository.EmployeeRepository;
import com.arham.mockbseapi.repository.TradeRepository;

import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import com.arham.mockbseapi.dto.employee.EmployeeBrokerageDTO;
import com.arham.mockbseapi.dto.employee.EmployeeIncentiveDTO;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;
    private final EmployeeClientMappingRepository mappingRepository;
    private final ClientMapper clientMapper;
    private final TradeRepository tradeRepository;
    private final TradeMapper tradeMapper;
    
    @Value("${incentive.percentage}")
    private BigDecimal incentivePercentage;
    
    public GetEmployeeDTO addEmployee(AddEmployeeDTO dto) {

        if (employeeRepository.existsByEmployeeCode(dto.getEmployeeCode()))
            throw new DuplicateResourceException("Employee Code already exists.");

        if (employeeRepository.existsByEmail(dto.getEmail()))
            throw new DuplicateResourceException("Email already exists.");

        if (employeeRepository.existsByMobile(dto.getMobile()))
            throw new DuplicateResourceException("Mobile already exists.");

        Employee employee = employeeMapper.toEntity(dto);

        employee = employeeRepository.save(employee);

        return employeeMapper.toDTO(employee);
    }

    public Page<GetEmployeeDTO> getAllEmployees(int pageNumber,
                                                int pageSize,
                                                String sortBy,
                                                String sortDirection) {

        Sort sort = sortDirection.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        return employeeRepository.findAll(pageable)
                .map(employeeMapper::toDTO);
    }

    public GetEmployeeDTO getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found."));

        return employeeMapper.toDTO(employee);
    }

    public GetEmployeeDTO updateEmployee(Long id,
                                         UpdateEmployeeDTO dto) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found."));

        if (employeeRepository.existsByEmailAndIdNot(dto.getEmail(), id))
            throw new DuplicateResourceException("Email already exists.");

        if (employeeRepository.existsByMobileAndIdNot(dto.getMobile(), id))
            throw new DuplicateResourceException("Mobile already exists.");

        employeeMapper.updateEmployee(dto, employee);

        employee = employeeRepository.save(employee);

        return employeeMapper.toDTO(employee);
    }

    public void deleteEmployee(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found."));

        employeeRepository.delete(employee);
    }
    
    public List<AssignedClientDTO> getAssignedClients(Long employeeId) {

        employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found."));

        List<EmployeeClientMapping> mappings =
                mappingRepository.findByEmployeeId(employeeId);

        return mappings.stream()
                .map(EmployeeClientMapping::getClient)
                .map(clientMapper::toAssignedClientDTO)
                .toList();
    }
    
    
    public List<GetTradeDTO> getEmployeeTrades(Long employeeId) {

        employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found."));

        List<EmployeeClientMapping> mappings =
                mappingRepository.findByEmployeeId(employeeId);

        List<Trade> trades = new ArrayList<>();

        for (EmployeeClientMapping mapping : mappings) {
            trades.addAll(
                    tradeRepository.findByClientId(
                            mapping.getClient().getId()));
        }

        return trades.stream()
                .map(tradeMapper::toDTO)
                .toList();
    }
    
    public EmployeeBrokerageDTO getEmployeeBrokerage(Long employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee not found."));

        List<EmployeeClientMapping> mappings =
                mappingRepository.findByEmployeeId(employeeId);

        BigDecimal totalBrokerage = BigDecimal.ZERO;

        for (EmployeeClientMapping mapping : mappings) {

            List<Trade> trades =
                    tradeRepository.findByClientId(mapping.getClient().getId());

            for (Trade trade : trades) {
                totalBrokerage = totalBrokerage.add(trade.getBrokerage());
            }
        }

        EmployeeBrokerageDTO dto = new EmployeeBrokerageDTO();

        dto.setEmployeeId(employee.getId());
        dto.setEmployeeCode(employee.getEmployeeCode());
        dto.setTotalBrokerage(totalBrokerage);

        return dto;
    }
    
    public EmployeeIncentiveDTO getEmployeeIncentive(Long employeeId) {

        EmployeeBrokerageDTO brokerageDTO = getEmployeeBrokerage(employeeId);

        BigDecimal incentiveAmount =
                brokerageDTO.getTotalBrokerage()
                        .multiply(incentivePercentage)
                        .divide(BigDecimal.valueOf(100));

        EmployeeIncentiveDTO dto = new EmployeeIncentiveDTO();

        dto.setEmployeeId(brokerageDTO.getEmployeeId());
        dto.setEmployeeCode(brokerageDTO.getEmployeeCode());
        dto.setTotalBrokerage(brokerageDTO.getTotalBrokerage());
        dto.setIncentivePercentage(incentivePercentage);
        dto.setIncentiveAmount(incentiveAmount);

        return dto;
    }
}