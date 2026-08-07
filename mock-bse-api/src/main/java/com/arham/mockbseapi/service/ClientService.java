package com.arham.mockbseapi.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.arham.mockbseapi.dto.client.AddClientDTO;
import com.arham.mockbseapi.dto.client.GetClientDTO;
import com.arham.mockbseapi.dto.client.UpdateClientDTO;
import com.arham.mockbseapi.entity.Client;
import com.arham.mockbseapi.exception.DuplicateResourceException;
import com.arham.mockbseapi.exception.ResourceNotFoundException;
import com.arham.mockbseapi.mapper.ClientMapper;
import com.arham.mockbseapi.repository.ClientRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;

    public GetClientDTO addClient(AddClientDTO dto) {

        if (clientRepository.existsByClientCode(dto.getClientCode()))
            throw new DuplicateResourceException("Client Code already exists.");

        if (clientRepository.existsByEmail(dto.getEmail()))
            throw new DuplicateResourceException("Email already exists.");

        if (clientRepository.existsByPanNumber(dto.getPanNumber()))
            throw new DuplicateResourceException("PAN Number already exists.");

        if (clientRepository.existsByMobile(dto.getMobile()))
            throw new DuplicateResourceException("Mobile Number already exists.");

        Client client = clientMapper.toEntity(dto);

        client = clientRepository.save(client);

        return clientMapper.toDTO(client);
    }

    public Page<GetClientDTO> getAllClients(int pageNumber,int pageSize,String sortBy,String sortDirection) {

		Sort sort = sortDirection.equalsIgnoreCase("asc")
		? Sort.by(sortBy).ascending()
		: Sort.by(sortBy).descending();
		
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		
		return clientRepository.findAll(pageable).map(clientMapper::toDTO);
	}

    public GetClientDTO getClientById(Long id) {

        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found."));

        return clientMapper.toDTO(client);
    }

    public GetClientDTO updateClient(Long id, UpdateClientDTO dto) {

        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found."));

        if (clientRepository.existsByEmailAndIdNot(dto.getEmail(), id))
            throw new DuplicateResourceException("Email already exists.");

        if (clientRepository.existsByPanNumberAndIdNot(dto.getPanNumber(), id))
            throw new DuplicateResourceException("PAN Number already exists.");

        if (clientRepository.existsByMobileAndIdNot(dto.getMobile(), id))
            throw new DuplicateResourceException("Mobile Number already exists.");

        clientMapper.updateClient(dto, client);

        client = clientRepository.save(client);

        return clientMapper.toDTO(client);
    }

    public void deleteClient(Long id) {

        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found."));

        clientRepository.delete(client);
    }

}