package com.arham.mockbseapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arham.mockbseapi.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmployeeCode(String employeeCode);

    boolean existsByEmployeeCode(String employeeCode);

    boolean existsByEmail(String email);

    boolean existsByMobile(String mobile);

    boolean existsByEmailAndIdNot(String email, Long id);

    boolean existsByMobileAndIdNot(String mobile, Long id);

}