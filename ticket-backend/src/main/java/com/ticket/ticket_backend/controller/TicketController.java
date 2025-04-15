package com.ticket.ticket_backend.controller;

import com.ticket.ticket_backend.model.Ticket;
import com.ticket.ticket_backend.repository.TicketRepository;
import com.ticket.ticket_backend.service.EmailService;
import com.ticket.ticket_backend.service.TicketDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:4200")
public class TicketController {

    @Autowired
    private EmailService emailService;
    @Autowired
    private TicketRepository ticketRepository;

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestParam String email) {
        try {
            if (email == null || email.isEmpty()) {
                return ResponseEntity.badRequest().body("Email is required");
            }
            emailService.sendOtp(email);
            return ResponseEntity.ok("OTP sent");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to send OTP");
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        try {
            if (email == null || email.isEmpty() || otp == null || otp.isEmpty()) {
                return ResponseEntity.badRequest().body("Email and OTP are required");
            }
            if (emailService.verifyOtp(email, otp)) {
                return ResponseEntity.ok("OTP verified");
            } else {
                return ResponseEntity.badRequest().body("Invalid OTP");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to verify OTP");
        }
    }

    @PostMapping("/send-confirmation")
    public ResponseEntity<?> sendConfirmation(@RequestParam String email, @RequestBody TicketDetails ticket) {
        try {
            if (email == null || email.isEmpty() || ticket == null) {
                return ResponseEntity.badRequest().body("Email and ticket are required");
            }
            emailService.sendConfirmation(email, ticket);
            return ResponseEntity.ok("Confirmation sent");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to send confirmation");
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTicket(@RequestParam String email, @RequestBody TicketDetails ticket) {
        try {
            if (email == null || email.isEmpty() || ticket == null) {
                return ResponseEntity.badRequest().body("Email and ticket are required");
            }
            Ticket newTicket = new Ticket();
            // Get the max ticket_id and increment
            Integer maxTicketId = ticketRepository.findAll().stream()
                .map(Ticket::getTicketId)
                .filter(id -> id != null)
                .max(Integer::compare)
                .orElse(0);
            Integer newTicketId = maxTicketId + 1;
            newTicket.setTicketId(newTicketId);
            newTicket.setSportName(ticket.getSportName());
            newTicket.setGmail(email);
            newTicket.setPhone(ticket.getPhone());
            newTicket.setUsername(ticket.getUsername());
            newTicket.setTicketType(ticket.getTicketType());
            ticketRepository.save(newTicket);
            // Update the ticketDetails with the new ticketId for confirmation
            ticket.setTicketId(newTicketId.toString());
            emailService.sendConfirmation(email, ticket);
            // Return the new ticketId in the response
            return ResponseEntity.ok("Ticket created and confirmation sent, Ticket ID: " + newTicketId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to create ticket: " + e.getMessage());
        }
    }

    @GetMapping("/getBookedTickets")
    public ResponseEntity<List<TicketDetails>> getBookedTickets(@RequestParam String email) {
        try {
            if (email == null || email.isEmpty()) {
                return ResponseEntity.badRequest().body(null);
            }
            List<Ticket> tickets = ticketRepository.findByGmail(email);
            List<TicketDetails> ticketDetailsList = tickets.stream()
                .map(ticket -> {
                    TicketDetails td = new TicketDetails();
                    td.setTicketId(ticket.getTicketId() != null ? ticket.getTicketId().toString() : null);
                    td.setSportName(ticket.getSportName());
                    td.setUsername(ticket.getUsername());
                    td.setPhone(ticket.getPhone());
                    td.setTicketType(ticket.getTicketType());
                    return td;
                })
                .collect(Collectors.toList());
            return ResponseEntity.ok(ticketDetailsList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}