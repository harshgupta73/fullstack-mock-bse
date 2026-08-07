package com.arham.mockbseapi.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.arham.mockbseapi.dto.mapping.AddEmployeeClientMappingDTO;
import com.arham.mockbseapi.dto.mapping.GetEmployeeClientMappingDTO;
import com.arham.mockbseapi.entity.Client;
import com.arham.mockbseapi.entity.Employee;
import com.arham.mockbseapi.entity.EmployeeClientMapping;
import com.arham.mockbseapi.exception.DuplicateResourceException;
import com.arham.mockbseapi.exception.ResourceNotFoundException;
import com.arham.mockbseapi.mapper.EmployeeClientMappingMapper;
import com.arham.mockbseapi.repository.ClientRepository;
import com.arham.mockbseapi.repository.EmployeeClientMappingRepository;
import com.arham.mockbseapi.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeClientMappingService {

    private final EmployeeClientMappingRepository mappingRepository;
    private final EmployeeRepository employeeRepository;
    private final ClientRepository clientRepository;
    private final EmployeeClientMappingMapper mappingMapper;

    public GetEmployeeClientMappingDTO addMapping(AddEmployeeClientMappingDTO dto) {

        if (mappingRepository.existsByEmployeeIdAndClientId(dto.getEmployeeId(), dto.getClientId()))
            throw new DuplicateResourceException("Mapping already exists.");
        
        if (mappingRepository.existsByClientId(dto.getClientId())) {
            throw new DuplicateResourceException(
                    "Client is already assigned to another employee.");
        }
        
        Employee employee = employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found."));

        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new ResourceNotFoundException("Client not found."));

        EmployeeClientMapping mapping = mappingMapper.toEntity(dto);

        mapping.setEmployee(employee);
        mapping.setClient(client);

        mapping = mappingRepository.save(mapping);

        return mappingMapper.toDTO(mapping);
    }

    public Page<GetEmployeeClientMappingDTO> getAllMappings(int pageNumber,
                                                            int pageSize,
                                                            String sortBy,
                                                            String sortDirection) {

        Sort sort = sortDirection.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        return mappingRepository.findAll(pageable)
                .map(mappingMapper::toDTO);
    }

    public void deleteMapping(Long id) {

        EmployeeClientMapping mapping = mappingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mapping not found."));

        mappingRepository.delete(mapping);
    }

}