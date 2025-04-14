import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private backendUrl = 'http://localhost:8080/api';
  private emailServiceUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  sendOtp(email: string): Observable<any> {
    return this.http.post(`${this.emailServiceUrl}/send-otp`, { email });
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.emailServiceUrl}/verify-otp`, { email, otp });
  }

  bookTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.backendUrl}/tickets/book`, ticket);
  }

  getBookedTickets(gmail: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.backendUrl}/tickets/booked`, { params: { gmail } });
  }
}