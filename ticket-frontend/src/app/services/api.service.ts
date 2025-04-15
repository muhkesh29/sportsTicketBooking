import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api/tickets';

  constructor(private http: HttpClient) {}

  // Send OTP (updated to use query param)
  sendOtp(email: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/send-otp?email=${encodeURIComponent(email)}`, null, { responseType: 'text' });
  }

  // Verify OTP
  verifyOtp(email: string, otp: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/verify-otp?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`, null, { responseType: 'text' });
  }

  // Get booked tickets
  getBookedTickets(email: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/getBookedTickets?email=${encodeURIComponent(email)}`);
  }

  // Book ticket
  bookTicket(ticket: Ticket): Observable<string> {
    return this.http.post(`${this.baseUrl}/create?email=${encodeURIComponent(ticket.gmail)}`, ticket, { responseType: 'text' });
  }
}

export interface Ticket {
  ticketId?: string;
  sportName: string;
  gmail: string;
  phone: string;
  username: string;
  ticketType: string;
}