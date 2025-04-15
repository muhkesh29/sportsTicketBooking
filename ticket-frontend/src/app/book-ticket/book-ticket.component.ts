import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Ticket } from '../models/ticket';

@Component({
  selector: 'app-book-ticket',
  standalone: false,
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {
  sport: string = '';
  gmail: string = '';
  otp: string = '';
  otpSent: boolean = false;
  isOtpVerified: boolean = false;
  ticket: Ticket = { sportName: '', gmail: '', phone: '', username: '', ticketType: 'Regular' };
  vipAlertShown: boolean = false; // Flag for two-step VIP booking

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sport = this.route.snapshot.paramMap.get('sport') || '';
    this.ticket.sportName = this.sport;
  }

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
        alert(response || 'OTP verified'); // Use response or fallback message
      },
      error: (error) => alert(error.error || 'Invalid OTP')
    });
  }

  // Validation methods
  isValidPhone(phone: string): boolean {
    const phoneRegex = /^\d{10}$/; // Exactly 10 digits
    return phoneRegex.test(phone);
  }

  isValidUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z\s-]+$/; // Letters, spaces, and hyphens only
    return usernameRegex.test(username) && username.trim().length > 0;
  }

  canBookTicket(): boolean {
    return this.isOtpVerified && this.isValidPhone(this.ticket.phone) && this.isValidUsername(this.ticket.username);
  }

  // Method to handle VIP selection alert
  checkVip(): void {
    if (this.ticket.ticketType === 'VIP') {
      alert('VIP tickets are only for Principal, Coach, State, and National level Players. I request you to carry a valid ID proof during the event.');
    }
  }

  bookTicket(): void {
    this.ticket.gmail = this.gmail;

    if (this.ticket.ticketType === 'VIP' && !this.vipAlertShown) {
      this.vipAlertShown = true; // Set flag after first click
      return; // Exit on first click for VIP
    }

    // Proceed with booking on second click for VIP or directly for Regular
    if (this.ticket.ticketType === 'VIP' && this.vipAlertShown) {
      this.vipAlertShown = false; // Reset flag after second click
    }

    if (this.canBookTicket()) {
      this.apiService.bookTicket(this.ticket).subscribe({
        next: (response) => {
          alert(response || 'Ticket booked successfully!');
          this.router.navigate(['/']);
        },
        error: (error) => alert(error.error || 'Failed to book ticket')
      });
    } else {
      alert('Please enter a valid 10-digit phone number and a valid username (letters, spaces, and hyphens only).');
    }
  }
}