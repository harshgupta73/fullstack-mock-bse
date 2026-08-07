package com.arham.mockbseapi.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.arham.mockbseapi.dto.client.AddClientDTO;
import com.arham.mockbseapi.dto.client.GetClientDTO;
import com.arham.mockbseapi.dto.client.UpdateClientDTO;
import com.arham.mockbseapi.service.ClientService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GetClientDTO addClient(@Valid @RequestBody AddClientDTO dto) {
        return clientService.addClient(dto);
    }

    @GetMapping
    public Page<GetClientDTO> getAllClients(

            @RequestParam(defaultValue = "0") int pageNumber,

            @RequestParam(defaultValue = "5") int pageSize,

            @RequestParam(defaultValue = "id") String sortBy,

            @RequestParam(defaultValue = "asc") String sortDirection) {

        return clientService.getAllClients(pageNumber,pageSize,sortBy,sortDirection);

    }

    @GetMapping("/{id}")
    public GetClientDTO getClientById(@PathVariable Long id) {
        return clientService.getClientById(id);
    }

    @PutMapping("/{id}")
    public GetClientDTO updateClient(@PathVariable Long id,
                                     @Valid @RequestBody UpdateClientDTO dto) {
        return clientService.updateClient(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
    }

}