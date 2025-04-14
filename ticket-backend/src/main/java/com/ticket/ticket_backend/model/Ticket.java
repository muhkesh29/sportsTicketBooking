package com.ticket.ticket_backend.model;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;
    private String sportName;
    private String gmail;
    private String phone;
    private String username;
    private String ticketType; // "Regular" or "VIP"
}