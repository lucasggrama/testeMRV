package com.testesquadra.demo.Controller;

import com.testesquadra.demo.Services.LeadServices;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import com.testesquadra.demo.Entidades.Lead;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LeadController {

    @Autowired
    private LeadServices leadServices;

    @GetMapping("/leads")
    public String listarLeads(Model model) {
        List<Lead> leads = leadServices.listAll();
        model.addAttribute("leads", leads);
        return "leads"; 
    }

}
