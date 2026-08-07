package com.arham.mockbseapi.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.arham.mockbseapi.dto.mapping.AddEmployeeClientMappingDTO;
import com.arham.mockbseapi.dto.mapping.GetEmployeeClientMappingDTO;
import com.arham.mockbseapi.service.EmployeeClientMappingService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/mappings")
@RequiredArgsConstructor
public class EmployeeClientMappingController {

    private final EmployeeClientMappingService mappingService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GetEmployeeClientMappingDTO addMapping(
            @Valid @RequestBody AddEmployeeClientMappingDTO dto) {

        return mappingService.addMapping(dto);
    }

    @GetMapping
    public Page<GetEmployeeClientMappingDTO> getAllMappings(

            @RequestParam(defaultValue = "0") int pageNumber,

            @RequestParam(defaultValue = "5") int pageSize,

            @RequestParam(defaultValue = "id") String sortBy,

            @RequestParam(defaultValue = "asc") String sortDirection) {

        return mappingService.getAllMappings(
                pageNumber,
                pageSize,
                sortBy,
                sortDirection);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMapping(@PathVariable Long id) {

        mappingService.deleteMapping(id);
    }

}