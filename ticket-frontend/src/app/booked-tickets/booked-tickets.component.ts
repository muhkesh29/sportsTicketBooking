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
  gmail: string = '';
  otp: string = '';
  otpSent: boolean = false;
  isOtpVerified: boolean = false;
  tickets: Ticket[] = [];

  constructor(private apiService: ApiService) {}

  sendOtp(): void {
    console.log('Sending OTP for email:', this.gmail);
    this.apiService.sendOtp(this.gmail).subscribe({
      next: (response) => {
        this.otpSent = true;
        alert(response || 'OTP sent to your Gmail');
      },
      error: (error) => alert(error.error || 'Failed to send OTP')
    });
  }

  verifyOtp(): void {
    this.apiService.verifyOtp(this.gmail, this.otp).subscribe({
      next: (response) => {
        this.isOtpVerified = true;
        this.loadTickets();
        alert(response || 'OTP verified'); // Use response or fallback message
      },
      error: (error) => alert(error.error || 'Invalid OTP')
    });
  }

  loadTickets(): void {
    this.apiService.getBookedTickets(this.gmail).subscribe({
      next: (tickets) => (this.tickets = tickets),
      error: (error) => alert(error.error || 'Failed to load tickets')
    });
  }
}