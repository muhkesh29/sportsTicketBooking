package com.ticket.ticket_backend.service;
import java.util.List;
import com.ticket.ticket_backend.model.Ticket;
import com.ticket.ticket_backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private RestTemplate restTemplate;
    private final String emailServiceUrl = "http://localhost:3000";

    public Ticket bookTicket(Ticket ticket) {
        Ticket savedTicket = ticketRepository.save(ticket);
        // Send confirmation email
        restTemplate.postForObject(emailServiceUrl + "/send-confirmation", 
            new EmailRequest(ticket.getGmail(), savedTicket), Void.class);
        return savedTicket;
    }

    public List<Ticket> getTicketsByGmail(String gmail) {
        return ticketRepository.findByGmail(gmail);
    }
}

class EmailRequest {
    private String email;
    private Ticket ticket;

    public EmailRequest(String email, Ticket ticket) {
        this.email = email;
        this.ticket = ticket;
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Ticket getTicket() { return ticket; }
    public void setTicket(Ticket ticket) { this.ticket = ticket; }
}