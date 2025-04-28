package com.testesquadra.demo.Controller;

import com.testesquadra.demo.Services.LeadServices;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import com.testesquadra.demo.Entidades.Lead;
import com.testesquadra.demo.Entidades.LeadStatus;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LeadController {

    @Autowired
    private LeadServices leadServices;

    @GetMapping("/listLeads")
    @ResponseBody
    public List<Lead> returnLeads() {
        return leadServices.listAll();
    }

    @GetMapping("/leads")
    public String listLeads(Model model) {
        List<Lead> leads = leadServices.listAll();
        model.addAttribute("leads", leads);
        return "leads";
    }

    @PostMapping("/leads/save")
    @ResponseBody
    public Lead salvarLead(@ModelAttribute Lead lead) {
        lead.setStatus(LeadStatus.INVITED);
        return leadServices.save(lead);
    }

    @PostMapping("/leads/accept/{id}")
    @ResponseBody
    public Lead acceptLeadStatus(@PathVariable Long id) {
        return leadServices.acceptLead(id);
    }

    @PostMapping("/leads/decline/{id}")
    @ResponseBody
    public Lead declineLeadStatus(@PathVariable Long id) {
        return leadServices.declineLead(id);
    }

}
