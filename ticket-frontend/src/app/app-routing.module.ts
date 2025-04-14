import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { BookedTicketsComponent } from './booked-tickets/booked-tickets.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'book/:sport', component: BookTicketComponent },
  { path: 'booked', component: BookedTicketsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }