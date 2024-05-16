import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { StatusService } from './service/status.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit {
  updateUserBookings$!: Observable<any>;
  tableNumber: any;
  @Input() userId: any = '';
  @Input() userEmail: any = '';
  selectedTable: string = '';
  updatedUser: any;
  isBooked: boolean = false;
  showBookingMessage: boolean = false;
  showButton: boolean = false;
  name!:string
  status:any
  @Input() selectedSeat: any = ''; 
  @Input() selectedRoom: string | null = ''; 
  @Input() showcheckout: boolean = false;
  @Input() startDate: any;
  @Input() endDate:any;

  selectedSeats: string[] = [];
  wrapperVisible: boolean = true;


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private userService:DashboardService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private router:Router,
    private cdr: ChangeDetectorRef,
    private statusSrv: StatusService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userString = sessionStorage.getItem('loginUser');
      if (userString) {
        const user = JSON.parse(userString); 
        this.name = user.name;
        this.userEmail = user.email;

    }
  }
  this.updateStatus()
}
ngOnChanges(changes: SimpleChanges): void {
  if (changes['startDate'] || changes['endDate']) {
    this.updateStatus();
  }
}

  onBookSeatClicked(): void {
    this.showBookingMessage = true;
  }

  toggleWrapper() {
    this.wrapperVisible = !this.wrapperVisible;
  }

  handleWrapperClick(event: MouseEvent) {
    const paymentElement = document.getElementById('payment');
    if (paymentElement && !paymentElement.contains(event.target as Node)) {
      this.wrapperVisible = false;
    }
  }

  updateUserBookings() {
    
      if (this.startDate && this.endDate) {
        const formattedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd HH:mm');
        const formattedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd HH:mm');


      this.updatedUser = 
          {
            id: uuidv4(),
            email: this.userEmail,
            roomNumber: this.selectedRoom,
            status: this.status,
            seatNumber: this.selectedSeat, 
            startDate: formattedStartDate,
            endDate: formattedEndDate,

          }
        }
          this.userService.addBook(this.updatedUser)
            .subscribe(() => {
              console.log(this.startDate)
              console.log(this.endDate)
              console.log(this.updatedUser)
              
              this.showButton=true
              console.log('User updated successfully');
            });
        
  }
  onSubmit() {
    console.log("object");
    
    this.updateUserBookings();

  }
  toBookedpage(){
    this.router.navigate(['main/booked'])
  }
  updateStatus(): void {
    const currentTime = new Date();
    if (this.endDate < currentTime) {
      this.status = 'over';
    } else if (this.startDate > currentTime) {
      this.status = 'upcoming';
    } else {
      this.status = 'active';
    }
    this.cdr.detectChanges();

  }
  
}
