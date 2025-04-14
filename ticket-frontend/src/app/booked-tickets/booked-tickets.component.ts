import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Ticket } from '../models/ticket';

@Component({
  selector: 'app-booked-tickets',
  standalone: false,
  templateUrl: './booked-tickets.component.html',
  styleUrls: ['./booked-tickets.component.css']
})
export class BookedTicketsComponent {
  gmail = '';
  otp = '';
  otpSent = false;
  isOtpVerified = false;
  tickets: Ticket[] = [];

  constructor(private apiService: ApiService) {}

  sendOtp(): void {
    this.apiService.sendOtp(this.gmail).subscribe({
      next: () => {
        this.otpSent = true;
        alert('OTP sent to your Gmail');
      },
      error: () => alert('Failed to send OTP')
    });
  }

  verifyOtp(): void {
    this.apiService.verifyOtp(this.gmail, this.otp).subscribe({
      next: () => {
        this.isOtpVerified = true;
        this.loadTickets();
      },
      error: () => alert('Invalid OTP')
    });
  }

  loadTickets(): void {
    this.apiService.getBookedTickets(this.gmail).subscribe({
      next: (tickets) => (this.tickets = tickets),
      error: () => alert('Failed to load tickets')
    });
  }
}