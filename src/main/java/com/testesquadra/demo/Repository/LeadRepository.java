package com.testesquadra.demo.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.testesquadra.demo.Entidades.Lead;

public interface LeadRepository extends JpaRepository<Lead, Long>  {
    
}
