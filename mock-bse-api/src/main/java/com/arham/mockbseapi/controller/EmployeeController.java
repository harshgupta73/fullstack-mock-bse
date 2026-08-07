package com.arham.mockbseapi.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.arham.mockbseapi.dto.employee.AddEmployeeDTO;
import com.arham.mockbseapi.dto.employee.AssignedClientDTO;
import com.arham.mockbseapi.dto.employee.EmployeeBrokerageDTO;
import com.arham.mockbseapi.dto.employee.EmployeeIncentiveDTO;
import com.arham.mockbseapi.dto.employee.GetEmployeeDTO;
import com.arham.mockbseapi.dto.employee.UpdateEmployeeDTO;
import com.arham.mockbseapi.dto.trade.GetTradeDTO;
import com.arham.mockbseapi.service.EmployeeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GetEmployeeDTO addEmployee(@Valid @RequestBody AddEmployeeDTO dto) {
        return employeeService.addEmployee(dto);
    }

    @GetMapping
    public Page<GetEmployeeDTO> getAllEmployees(

            @RequestParam(defaultValue = "0") int pageNumber,

            @RequestParam(defaultValue = "5") int pageSize,

            @RequestParam(defaultValue = "id") String sortBy,

            @RequestParam(defaultValue = "asc") String sortDirection) {

        return employeeService.getAllEmployees(
                pageNumber,
                pageSize,
                sortBy,
                sortDirection);
    }

    @GetMapping("/{id}")
    public GetEmployeeDTO getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }

    @PutMapping("/{id}")
    public GetEmployeeDTO updateEmployee(@PathVariable Long id,
                                         @Valid @RequestBody UpdateEmployeeDTO dto) {

        return employeeService.updateEmployee(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }
    
    @GetMapping("/{id}/clients")
    public List<AssignedClientDTO> getAssignedClients(@PathVariable Long id) {

        return employeeService.getAssignedClients(id);

    }
    
    @GetMapping("/{id}/trades")
    public List<GetTradeDTO> getEmployeeTrades(@PathVariable Long id){

        return employeeService.getEmployeeTrades(id);

    }
    
    @GetMapping("/{id}/brokerage")
    public EmployeeBrokerageDTO getEmployeeBrokerage(
            @PathVariable Long id) {

        return employeeService.getEmployeeBrokerage(id);

    }
    
    @GetMapping("/{id}/incentive")
    public EmployeeIncentiveDTO getEmployeeIncentive(@PathVariable Long id) {

        return employeeService.getEmployeeIncentive(id);

    }

}