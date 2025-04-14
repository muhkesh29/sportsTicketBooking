import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  sports = [
    { name: 'Cricket', image: 'assets/cricket.jpg', description: 'Enjoy thrilling cricket matches live!' },
    { name: 'Football', image: 'assets/football.jpg', description: 'Experience the passion of football!' },
    { name: 'Basketball', image: 'assets/basketball.jpg', description: 'Catch fast-paced basketball action!' },
    { name: 'Tennis', image: 'assets/tennisnew.jpg', description: 'Witness intense tennis rallies!' },
    { name: 'Volleyball', image: 'assets/volleyball.jpg', description: 'Enjoy dynamic volleyball matches!' },
    { name: 'Badminton', image: 'assets/badminton.jpg', description: 'Experience fast-paced badminton action!' },
    { name: 'Hockey', image: 'assets/hockey.jpg', description: 'Feel the excitement of high-speed hockey games!' }, // New entry
    { name: 'Rugby', image: 'assets/rugby.jpg', description: 'Dive into the rugged world of rugby!' }, // New entry
    { name: 'Swimming', image: 'assets/swimming.jpg', description: 'Watch elite swimmers compete in style!' } // New entry
  ];
}