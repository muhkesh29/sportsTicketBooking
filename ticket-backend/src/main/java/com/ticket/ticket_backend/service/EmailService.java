package com.ticket.ticket_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // In-memory OTP storage (replace with database for production)
    private final Map<String, String> otps = new HashMap<>();

    public String generateOtp() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }

    public void sendOtp(String email) {
        String otp = generateOtp();
        otps.put(email, otp);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("guptamukesh9380@gmail.com");
        message.setTo(email);
        message.setSubject("OTP for Ticket Booking");
        message.setText("Your OTP is: " + otp);
        mailSender.send(message);
    }

    public boolean verifyOtp(String email, String otp) {
        String storedOtp = otps.get(email);
        if (storedOtp != null && storedOtp.equals(otp)) {
            otps.remove(email); // Clear OTP after verification
            return true;
        }
        return false;
    }

    public void sendConfirmation(String email, TicketDetails ticket) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("guptamukesh9380@gmail.com");
        message.setTo(email);
        message.setSubject("Ticket Booking Confirmation");
        message.setText(String.format(
            "Your ticket is booked!\nDetails:\nTicket ID: %s\nSport: %s\nUsername: %s\nPhone: %s\nTicket Type: %s",
            ticket.getTicketId(), ticket.getSportName(), ticket.getUsername(), ticket.getPhone(), ticket.getTicketType()
        ));
        mailSender.send(message);
    }
}