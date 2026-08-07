package com.arham.mockbseapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arham.mockbseapi.entity.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client> findByClientCode(String clientCode);

    boolean existsByClientCode(String clientCode);

    boolean existsByEmail(String email);

    boolean existsByPanNumber(String panNumber);

    boolean existsByMobile(String mobile);

    boolean existsByEmailAndIdNot(String email, Long id);

    boolean existsByPanNumberAndIdNot(String panNumber, Long id);

    boolean existsByMobileAndIdNot(String mobile, Long id);

}