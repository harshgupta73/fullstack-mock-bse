package com.arham.mockbseapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.arham.mockbseapi.dto.mapping.AddEmployeeClientMappingDTO;
import com.arham.mockbseapi.dto.mapping.GetEmployeeClientMappingDTO;
import com.arham.mockbseapi.entity.EmployeeClientMapping;

@Mapper(componentModel = "spring")
public interface EmployeeClientMappingMapper {

    @Mapping(target = "employee", ignore = true)
    @Mapping(target = "client", ignore = true)
    EmployeeClientMapping toEntity(AddEmployeeClientMappingDTO dto);

    @Mapping(source = "employee.id", target = "employeeId")
    @Mapping(source = "employee.employeeCode", target = "employeeCode")
    @Mapping(source = "client.id", target = "clientId")
    @Mapping(source = "client.clientCode", target = "clientCode")
    GetEmployeeClientMappingDTO toDTO(EmployeeClientMapping mapping);

}