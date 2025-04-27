package com.testesquadra.demo.Entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@Table(name = "leads")
public class Lead {
    @Id
    @GeneratedValue
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;    
    private Date dateCreated;
    private String suburb;
    private String category;
    private String description;
    private Double price;
    @Enumerated(EnumType.STRING)
    private LeadStatus status;

}
