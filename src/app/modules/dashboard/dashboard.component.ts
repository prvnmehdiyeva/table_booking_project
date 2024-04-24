import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Output() seatSelected = new EventEmitter<string>();
  selectedTable: string | null = null;
  @Input() UserBooking: any = '';
  bookedSeats: string[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userString = sessionStorage.getItem('loginUser');
      if (userString) {
        const user = JSON.parse(userString);
        this.UserBooking = user.bookings.map((booking: { seatNumber: any; }) => booking.seatNumber);
        this.bookedSeats = this.UserBooking; 
        console.log("🚀 ~ DashboardComponent ~ ngOnInit ~ bookedSeats:", this.bookedSeats)
      }
    }
  }

  isSeatBooked(seatId: string): boolean {
    return this.bookedSeats.includes(seatId);
  }

  getAltMessage(isBooked: boolean): string {
    return isBooked ? 'This seat is already booked' : '';
  }

  isSeatSelected(seatId: string): boolean {
    return this.selectedTable === seatId;
  }

  onSeatClicked(seatId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('selectedSeatId', seatId); 
      this.selectedTable = (this.selectedTable === seatId) ? null : seatId;
    }
  }
}
