package com.arham.mockbseapi.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employee_client_mapping")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeClientMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;
}