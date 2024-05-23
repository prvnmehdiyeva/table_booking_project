import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonService } from '../../../../../commonService/common.service';
import { DevspaceService } from '../devspace/service/devspace.service';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { EventEmitter,Output } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { momentTimezone } from '@mobiscroll/angular';
import moment from 'moment-timezone';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DashboardService } from '../../../../dashboard/services/dashboard.service';
import { StyleService } from '../../../../../styleservice/style.service';
@Component({
  selector: 'app-table-styles',
  templateUrl: './table-styles.component.html',
  styleUrl: './table-styles.component.scss'
})
export class TableStylesComponent implements OnInit {
  style1Seats:any[]=[]
 @Input() style2Seats:any[]=[]
 @Input() style1Id:string[]=[]
  table2Id:any[]=[]
@Input() roomName!:string
@Input() roomDes!:string
@Input() rowLength!:number
userEmail!:any
showAdmin: boolean = false
@Input() doubleSeatLength!:number
@Input() numToAdd!: number ; 
@Input() numToDelete!: number ;
@Input() available!: number
@Input() selectedStyle: string | null = 'styleSingle4';
styleClass!: any;
@Output() seatSelected = new EventEmitter<string>();
@Input()  selectedTable: string | null = null;
@Input() UserBooking: any = '';
@Input() startDate!: Date; 
@Input() endDate!: Date;

userStartDate!:any
userEndDate!:any
bookedSeats: string[] = [];
bookings: any[] = [];
table1Seats:any[]=[]
table1Id:any[]=[]
table2Seats:any[]=[]
table3Seats:any[]=[]
table3Id:any[]=[]
public momentPlugin = momentTimezone;
public selected!: any;
showButton: boolean =false;
isValid: boolean =false;
@Input() checkoutVisible: boolean = false;
showToast: boolean = false
roomNumber:string = '1'
@Input() selectedRoom: any | null = "1";
managerTable:any
datesUser: any[] = []
horizontalPosition: MatSnackBarHorizontalPosition = 'center';
verticalPosition: MatSnackBarVerticalPosition = 'top';
endedStartDate:any
endedEndDate:any

constructor(
  @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) public document: Document,
    private userService:DashboardService,
    // private datePipe: DatePipe,
    private srv:CommonService,
    private snackBar: MatSnackBar,
    private styleSrv:StyleService

)
{}

ngOnInit() {
  console.log("Start Date:", this.startDate);
    console.log("End Date:", this.endDate);
  this.styleSrv.selectedStyle$.subscribe(style => {
    this.selectedStyle = style;
  });
  
  if (isPlatformBrowser(this.platformId)) {
    const userString = sessionStorage.getItem('loginUser')
    if(userString){
      const user = JSON.parse(userString); 
      this.userEmail = user.email
      this.srv.getUsers().subscribe((data)=>{
        data.forEach((users:any)=>{
          if(user.role){
            this.showAdmin = true
          }else {
            this.showAdmin = false; 
        }
        })
      })
    }
  }
  // this.fetchSeats1()
  this.fetchSeats2()
  this.fetchSeats3()
  this.fetchSeats()


  this.srv.getBookings().subscribe((data) => {
    const userBookings = data.filter((element: any) => element.email === this.userEmail);
    userBookings.forEach((element: any) => {
      if(element.status !== 'ended'){
        console.log(element.status);
        const { startDate, endDate } = element;
        const dateRange = { startDate, endDate };
       
        let currentDate = new Date(startDate);
        const endDateTime = new Date(endDate);

        while (currentDate <= endDateTime) {
            this.datesUser.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    });
}); 

}
  
fetchSeats(){
  this.srv.getSeats1().subscribe((data)=>{
    console.log(data);
    this.rowLength = data.length
   let i = data.length;
   if (i > 0) {
   this.style1Seats = [data[0].id, data[1].id];
   let style2length = i
   this.style1Seats = data.slice(0, i).map((item: { id: any; }) => item.id);
   this.style2Seats = Array.from({ length: style2length });
   this.doubleSeatLength = style2length * 3
   if (i > 0) {
    this.style1Id = data[i - 1].seats;
  }

   console.log(this.style1Seats);
   console.log(this.style2Seats);
   
   }
  })
 }

notManager(seatId: any) {
  if (seatId === 1)   {
      return !this.showAdmin;
  } else {
      return false;
  }
}


selectRoom(room: any | null) {
this.selectedRoom = room;
this.handleRangeChange({ value: [this.startDate, this.endDate] }, this.selectedRoom);
}



toggleSelection(seatId: any):boolean {
    return this.selectedTable === seatId;
}

getAltMessage(isBooked: boolean, seatId: any): string {
if (this.notManager(seatId)) {
  return 'This seat is managed by a manager';
} else {
  return isBooked ? 'This seat is already booked' : 'Please, add date and time';
}
}


onSeatClicked(seatId: any) {
  this.seatSelected.emit(seatId);

if (isPlatformBrowser(this.platformId)) {
  if (!this.bookedSeats.includes(seatId) && !this.notManager(seatId)) {
    console.log("object");
    sessionStorage.setItem('selectedSeatId', seatId); 
    this.showButton=true
    this.selectedTable = seatId; 
    this.seatSelected.emit(seatId); 
    
  } else {
    console.log('Seat already booked:', seatId);
  }
    console.log("🚀 ~ DashboardComponent ~ onSeatClicked ~ seatId:", seatId)
}
}

isSeatBooked(seatId: any): boolean {
return this.bookedSeats.includes(seatId);
}
isSeatManager(seatId: any): boolean {
return this.bookedSeats.includes(seatId);
}

handleRangeChange(event: any, roomNumber: any) {
const range = event.value;
if (range && range.length === 2) {
  this.startDate = range[0];
  this.endDate = range[1];
  this.bookedSeats = [];
  this.userService.getBookings().subscribe((data) => {
    
    data.forEach((booking: any) => {
      const bookingStartDate = new Date(booking.startDate);
      const bookingEndDate = new Date(booking.endDate);
      const startDateTime = this.startDate;
      const endDateTime = this.endDate;
      

      if (startDateTime <= bookingEndDate && endDateTime >= bookingStartDate && booking.roomNumber === this.selectedRoom && booking.status !=='ended') {
        this.bookedSeats.push(booking.seatNumber);
      }
      
      let datesCurrent: any[] = [];
      let currentDate = new Date(startDateTime);
      while (currentDate <= endDateTime) {
        datesCurrent.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      if (this.hasDuplicateDates(datesCurrent)) {
        this.showToast = true;
        this.isValid = true;
        this.snackBar.open("It is not allowed to book a seat on the same day twice.", 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 4000,
          panelClass: ['custom-snackbar']
        });
      } else {
        this.isValid = false; 
      }
      
    });

  });
}
}

hasDuplicateDates(datesCurrent: Date[]): boolean {
for (let date of datesCurrent) {
  for (let userDate of this.datesUser) {
    if (date.getMonth() === userDate.getMonth() && date.getDate() === userDate.getDate()) {
      return true;
    }
  }
}
return false;
}




toggleCheckout(seat:any) {
console.log("Toggle Checkout for seat:", seat);
if (this.selectedTable !== seat) {
  this.selectedTable = seat;
  this.checkoutVisible = true;
  this.seatSelected.emit(seat);
} else {
  this.checkoutVisible = !this.checkoutVisible;
}
}

// formatDate(date: Date): string {
// return this.datePipe.transform(date, 'MM/dd/yyyy HH:mm', '+0400', 'az-AZ') || '';
// }
// fetchSeats1(){
//   this.srv.getSeats1().subscribe((data)=>{
//    let i = data.length;
//    this.table1Seats = [data[0].id, data[1].id];
//    this.table1Seats = data.slice(0, i).map((item: { id: any; }) => item.id);
//    this.table1Id = data[i - 1].seats;
//    this.managerTable = data.find((item: any) => item.id === '1') || [];
//   })
//  }
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
