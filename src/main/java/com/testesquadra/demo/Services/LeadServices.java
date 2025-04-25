package com.testesquadra.demo.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.testesquadra.demo.Entidades.Lead;
import com.testesquadra.demo.Entidades.LeadStatus;
import com.testesquadra.demo.Repository.LeadRepository;

@Service
public class LeadServices {

    @Autowired
    private LeadRepository leadRepositorio;

    public List<Lead> listAll() {
        return leadRepositorio.findAll();
    }

    public Lead add(Lead lead) {
        return leadRepositorio.save(lead);
    }

    public void deleteById(Long id) {
        leadRepositorio.deleteById(id);
    }

    public Lead updateStatus(Long id, LeadStatus newStatus) {
        Lead lead = leadRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead com ID: " + id + " não existe"));
        
        if (newStatus == LeadStatus.ACCEPTED && lead.getPrice() > 500.0) {
            Double discount = 0.10;
            Double newPrice = lead.getPrice() * (1 - discount);
            lead.setPrice(newPrice);
        }
        lead.setStatus(newStatus);
        return leadRepositorio.save(lead);
    }
    
}
