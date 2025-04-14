package com.ticket.ticket_backend.controller;

import com.ticket.ticket_backend.model.Ticket;
import com.ticket.ticket_backend.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    @Autowired
    private TicketService ticketService;

    @PostMapping("/book")
    public Ticket bookTicket(@RequestBody Ticket ticket) {
        return ticketService.bookTicket(ticket);
    }

    @GetMapping("/booked")
    public List<Ticket> getBookedTickets(@RequestParam String gmail) {
        return ticketService.getTicketsByGmail(gmail);
    }
}