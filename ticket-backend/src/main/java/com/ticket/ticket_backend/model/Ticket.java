package com.ticket.ticket_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Ticket {
    @Id
    private Integer ticketId; // Changed to Integer to match database integer type
    private String gmail;
    private String phone;
    private String sportName;
    private String ticketType;
    private String username;

    // Default constructor
    public Ticket() {}

    // Getters and setters
    public Integer getTicketId() { return ticketId; }
    public void setTicketId(Integer ticketId) { this.ticketId = ticketId; }
    public String getGmail() { return gmail; }
    public void setGmail(String gmail) { this.gmail = gmail; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getSportName() { return sportName; }
    public void setSportName(String sportName) { this.sportName = sportName; }
    public String getTicketType() { return ticketType; }
    public void setTicketType(String ticketType) { this.ticketType = ticketType; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}