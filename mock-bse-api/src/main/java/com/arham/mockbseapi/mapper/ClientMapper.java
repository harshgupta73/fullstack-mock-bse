package com.arham.mockbseapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.arham.mockbseapi.dto.client.AddClientDTO;
import com.arham.mockbseapi.dto.client.GetClientDTO;
import com.arham.mockbseapi.dto.client.UpdateClientDTO;
import com.arham.mockbseapi.dto.employee.AssignedClientDTO;
import com.arham.mockbseapi.entity.Client;

@Mapper(componentModel = "spring")
public interface ClientMapper {

    Client toEntity(AddClientDTO dto);

    GetClientDTO toDTO(Client client);

    void updateClient(UpdateClientDTO dto, @MappingTarget Client client);

    AssignedClientDTO toAssignedClientDTO(Client client);
}