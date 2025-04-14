const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

// Configure NodeMailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'guptamukesh9380@gmail.com', // Replace with your Gmail address
        pass: 'ecslufcmwqljulzz'     // Your App Password (no spaces)
    }
});

// Store OTPs temporarily (in-memory for simplicity)
const otps = {};

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:4200'
}));

// Send OTP
app.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otps[email] = otp;

    const mailOptions = {
        from: 'your_gmail@gmail.com',
        to: email,
        subject: 'OTP for Ticket Booking',
        text: `Your OTP is: ${otp}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
});

// Verify OTP
app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    if (otps[email] && otps[email] === otp) {
        delete otps[email]; // Clear OTP after verification
        res.status(200).json({ message: 'OTP verified' });
    } else {
        res.status(400).json({ error: 'Invalid OTP' });
    }
});

// Send booking confirmation
app.post('/send-confirmation', async (req, res) => {
    const { email, ticket } = req.body;
    const mailOptions = {
        from: 'guptamukesh9380@gmail.com',
        to: email,
        subject: 'Ticket Booking Confirmation',
        text: `Your ticket is booked!\nDetails:\nTicket ID: ${ticket.ticketId}\nSport: ${ticket.sportName}\nUsername: ${ticket.username}\nPhone: ${ticket.phone}\nTicket Type: ${ticket.ticketType}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Confirmation sent' });
    } catch (error) {
        console.error('Error sending confirmation:', error);
        res.status(500).json({ error: 'Failed to send confirmation' });
    }
});

app.listen(3000, () => console.log('Email service running on port 3000'));