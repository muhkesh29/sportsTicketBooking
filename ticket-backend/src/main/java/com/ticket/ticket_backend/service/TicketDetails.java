package com.ticket.ticket_backend.service;

public class TicketDetails {
    private String ticketId;
    private String sportName;
    private String username;
    private String phone;
    private String ticketType;

    // Default constructor (required for deserialization)
    public TicketDetails() {}

    // Getters and setters
    public String getTicketId() { return ticketId; }
    public void setTicketId(String ticketId) { this.ticketId = ticketId; }
    public String getSportName() { return sportName; }
    public void setSportName(String sportName) { this.sportName = sportName; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getTicketType() { return ticketType; }
    public void setTicketType(String ticketType) { this.ticketType = ticketType; }
}