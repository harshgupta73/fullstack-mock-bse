package com.arham.mockbseapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.arham.mockbseapi.dto.employee.AddEmployeeDTO;
import com.arham.mockbseapi.dto.employee.GetEmployeeDTO;
import com.arham.mockbseapi.dto.employee.UpdateEmployeeDTO;
import com.arham.mockbseapi.entity.Employee;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {

    Employee toEntity(AddEmployeeDTO dto);

    GetEmployeeDTO toDTO(Employee employee);

    void updateEmployee(UpdateEmployeeDTO dto,
                        @MappingTarget Employee employee);

}