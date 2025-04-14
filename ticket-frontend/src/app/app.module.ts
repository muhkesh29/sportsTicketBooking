import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { BookedTicketsComponent } from './booked-tickets/booked-tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookTicketComponent,
    BookedTicketsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }