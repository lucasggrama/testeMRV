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

    public Lead save(Lead lead) {
        return leadRepositorio.save(lead);
    }

    public void deleteById(Long id) {
        leadRepositorio.deleteById(id);
    }

    public Lead acceptLead(Long id) {
        Lead lead = leadRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead com ID: " + id + " não existe"));

        if (lead.getPrice() > 500.0) {
            Double discount = 0.10;
            Double newPrice = lead.getPrice() * (1 - discount);
            lead.setPrice(newPrice);
        }
        lead.setStatus(LeadStatus.ACCEPTED);
        EmailService emailService = new EmailService();
        emailService.sendEmail(
                "vendas@test.com",
                "Lead Aceito",
                "O lead do (a) " + lead.getFirstName() + " foi aceito com preço de " + lead.getPrice());

        return leadRepositorio.save(lead);
    }

    public Lead declineLead(Long id) {
        Lead lead = leadRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead com ID: " + id + " não existe"));
        lead.setStatus(LeadStatus.DECLINED);
        return leadRepositorio.save(lead);
    }
}
