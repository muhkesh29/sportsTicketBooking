package com.ticket.ticket_backend.repository;

import com.ticket.ticket_backend.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    List<Ticket> findByGmail(String gmail);
}