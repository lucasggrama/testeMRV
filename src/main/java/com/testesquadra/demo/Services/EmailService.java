package com.testesquadra.demo.Services;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;

public class EmailService {
    
    private static final String EMAIL_LOG_FILE = "emails_log.txt";

    public void sendEmail(String to, String subject, String body) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(EMAIL_LOG_FILE, true))) {
            writer.write("=== Novo Email ===\n");
            writer.write("Data/Hora: " + LocalDateTime.now() + "\n");
            writer.write("Para: " + to + "\n");
            writer.write("Assunto: " + subject + "\n");
            writer.write("Corpo: " + body + "\n");
            writer.write("====================\n\n");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
