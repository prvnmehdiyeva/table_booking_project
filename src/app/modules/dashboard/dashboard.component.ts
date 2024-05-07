import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { LoginserviceService } from '../login/services/loginservice.service';
import { DashboardService } from './services/dashboard.service';
import { DOCUMENT } from '@angular/common';
import { momentTimezone } from '@mobiscroll/angular';
import moment from 'moment-timezone';
import { CommonService } from '../../commonService/common.service';
momentTimezone.moment = moment;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  @Output() seatSelected = new EventEmitter<string>();
  roomName!:string
  selectedTable: string | null = null;
  @Input() UserBooking: any = '';
  bookedSeats: string[] = [];
  bookings: any[] = [];
  table1Seats:any[]=[]
  table1Id:any[]=[]
  table2Seats:any[]=[]
  table2Id:any[]=[]
  table3Seats:any[]=[]
  table3Id:any[]=[]
  startDate!: Date; 
  endDate!: Date;
  public momentPlugin = momentTimezone;
  public selected!: any;
  showButton: boolean =false;
  checkoutVisible: boolean = false;
  showAdmin: boolean = false
  roomNumber:string = '1'
  selectedRoom: string | null = "1";
  

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) public document: Document,
    private userService:DashboardService,
    private datePipe: DatePipe,
    private srv:CommonService

  ) {}

   ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userString = sessionStorage.getItem('loginUser')
      if(userString){
        const user = JSON.parse(userString); 
        this.srv.getUsers().subscribe((data)=>{
          data.forEach((users:any)=>{
            if(user.role){
              this.showAdmin = true
            }
          })
        })
      }
    }
    this.fetchSeats1()
    this.fetchSeats2()
    this.fetchSeats3()
    console.log("🚀 ~ DashboardComponent ~ ngOnInit ~ this.selectedRoom:", this.selectedRoom)
  }

  selectRoom(room: string) {
    this.selectedRoom = room;
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

handleRangeChange(event: any, roomNumber: string) {
  const range = event.value;
  if (range && range.length === 2) {
    if (this.selectedRoom === roomNumber) {
    this.startDate = range[0];
    this.endDate = range[1];
    this.bookedSeats = [];
    this.userService.getBookings().subscribe((data) => {
      data.forEach((booking: any) => {
          console.log(booking);
          const bookingStartDate = new Date(booking.startDate);
          console.log("🚀 ~ DashboardComponent ~ this.userService.getBookings ~ bookingStartDate:", bookingStartDate)
          const bookingEndDate = new Date(booking.endDate);
          const startDateTime = new Date(this.startDate);
          const endDateTime = new Date(this.endDate);
          console.log(roomNumber);
          if (startDateTime <= bookingEndDate && endDateTime >= bookingStartDate && booking.roomNumber === roomNumber) {
            console.log(booking.seatNumber);
            this.bookedSeats.push(booking.seatNumber);
          }
        });
      })
    }else {
      event.value = null
    }
  }
}

toggleCheckout(seat:string) {
  this.selectedTable = seat;
  this.checkoutVisible = !this.checkoutVisible;
}

formatDate(date: Date): string {
  return this.datePipe.transform(date, 'MM/dd/yyyy HH:mm', '+0400', 'az-AZ') || '';
}
fetchSeats1(){
  this.srv.getSeats1().subscribe((data)=>{
   let i = data.length;
   this.table1Seats = [data[0].id, data[1].id];
   this.table1Seats = data.slice(0, i).map((item: { id: any; }) => item.id);
   this.table1Id = data[i - 1].seats;

  })
 }
 fetchSeats2(){
  this.srv.getSeats2().subscribe((data)=>{
   let i = data.length;
   this.roomName=data[0].name
   this.table2Seats = [data[0].id, data[1].id];
   this.table2Seats = data.slice(0, i).map((item: { id: any; }) => item.id);
   this.table2Id = data[i - 1].seats;
  })
 }
 fetchSeats3(){
  this.srv.getSeats3().subscribe((data)=>{
   let i = data.length;
   this.roomName=data[0].name
   this.table3Seats = [data[0].id, data[1].id];
   this.table3Seats = data.slice(0, i).map((item: { id: any; }) => item.id);
   this.table3Id = data[i - 1].seats;
  })
 }
 

}

