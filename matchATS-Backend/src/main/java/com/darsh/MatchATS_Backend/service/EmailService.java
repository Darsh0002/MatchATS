package com.darsh.MatchATS_Backend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    public void sendMailToCandidate(String toEmail, String messageToSend) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("MatchATS <" + fromEmail + ">");
            helper.setTo(toEmail);
            helper.setSubject("Regarding Your Application - MatchATS");

            // Building an HTML body with a disclaimer footer
            String htmlBody = "<h3>Application Update</h3>" +
                    "<p>" + messageToSend + "</p>" +
                    "<br><br>" +
                    "<hr style='border: 0; border-top: 1px solid #eee;'>" +
                    "<p style='color: #777; font-size: 12px; font-style: italic;'>" +
                    "<b>Notice:</b> This email was sent from a <b>demonstration system (MatchATS)</b>. " +
                    "It is not a real job notification. Please do not reply to this email." +
                    "</p>";

            helper.setText(htmlBody, true);

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send demo email", e);
        }
    }
}
