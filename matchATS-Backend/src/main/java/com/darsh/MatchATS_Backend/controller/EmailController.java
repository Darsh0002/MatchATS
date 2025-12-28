package com.darsh.MatchATS_Backend.controller;

import com.darsh.MatchATS_Backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping
@CrossOrigin("*")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @PostMapping("/send/mail")
    public ResponseEntity<?> sendMail(@RequestBody Map<String, String> payload) {
        String message = payload.get("msg");
        String email = payload.get("email");

        emailService.sendMailToCandidate(email, message);
        return ResponseEntity.ok("Sent");
    }
}
