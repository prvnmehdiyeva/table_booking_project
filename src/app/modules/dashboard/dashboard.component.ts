import { DatePipe, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { LoginserviceService } from '../login/services/loginservice.service';
import { DashboardService } from './services/dashboard.service';
import { DOCUMENT } from '@angular/common';
import { momentTimezone } from '@mobiscroll/angular';
import moment from 'moment-timezone';
momentTimezone.moment = moment;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  @Output() seatSelected = new EventEmitter<string>();

  selectedTable: string | null = null;
  @Input() UserBooking: any = '';
  bookedSeats: string[] = [];
  bookings: any[] = [];
  startDate!: Date; 
  endDate!: Date;
  public momentPlugin = momentTimezone;
  public selected!: any;
showButton: boolean =false;
checkoutVisible: boolean = false;



  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) public document: Document,
    private userService:DashboardService,
    private changeDetectorRef: ChangeDetectorRef,
    private datePipe: DatePipe

  ) {}

   ngOnInit() {
    
  }
toggleDarkMode() {
  if (this.document.body.classList.contains('dark')) {
    this.document.body.classList.remove('dark');
  } else {
    this.document.body.classList.add('dark');
  }
  }
  toggleSelection(seatId: string):boolean {
    return this.selectedTable === seatId;
}

getAltMessage(isBooked: boolean): string {
  return isBooked ? 'This seat is already booked' : 'Please, add date and time';
}


onSeatClicked(seatId: string) {
  if (isPlatformBrowser(this.platformId)) {
    if (!this.bookedSeats.includes(seatId)) {
      sessionStorage.setItem('selectedSeatId', seatId); 
      console.log('Seat clicked:', seatId);
      this.showButton=true
      this.selectedTable = seatId; 
      this.seatSelected.emit(seatId); 
    } else {
      console.log('Seat already booked:', seatId);
    }
  }
}

isSeatBooked(seatId: string): boolean {
  return this.bookedSeats.includes(seatId);
}

handleRangeChange(event: any) {

  const range = event.value;
  if (range && range.length === 2) {
    this.startDate = range[0];
    this.endDate = range[1];
    this.bookedSeats = [];
    this.userService.getBookings().subscribe((data) => {
      data.forEach((booking: any) => {
          console.log(booking);
          const bookingStartDate = new Date(booking.startDate); //Invalid date
          console.log("🚀 ~ DashboardComponent ~ this.userService.getBookings ~ bookingStartDate:", bookingStartDate)
          const bookingEndDate = new Date(booking.endDate);
          const startDateTime = new Date(this.startDate);
          const endDateTime = new Date(this.endDate);
          if (startDateTime <= bookingEndDate && endDateTime >= bookingStartDate) {
            console.log(booking.seatNumber);
            this.bookedSeats.push(booking.seatNumber);
          }
        });
      })
    
  }
}



toggleCheckout(seat:string) {
  this.selectedTable = seat;
  this.checkoutVisible = !this.checkoutVisible;
}

formatDate(date: Date): string {
  return this.datePipe.transform(date, 'MM/dd/yyyy HH:mm', '+0400', 'az-AZ') || '';
}


}

