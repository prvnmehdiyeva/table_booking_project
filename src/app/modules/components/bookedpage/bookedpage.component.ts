import { ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { BookedpageService } from './service/bookedpage.service';
import { Observable, map, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { DashboardService } from '../../dashboard/services/dashboard.service';

@Component({
  selector: 'app-bookedpage',
  templateUrl: './bookedpage.component.html',
  styleUrls: ['./bookedpage.component.scss']
})
export class BookedpageComponent implements OnInit {
  @Input() selectedSeat: any = ''; 
  @Input() userEmail: any = ''; 
  @Input() selectedTable: any = ''; 
  @Input() startDate: any;
  @Input() endDate: any;
  userBooked$!: Observable<any>;
  deleteBookingId: string | null = null;
  bookingId:any
  constructor(
    private bookedservice: BookedpageService,
    private userService: DashboardService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getBooked();
  }

  getBooked(){
    if (isPlatformBrowser(this.platformId)) {
      const userString = sessionStorage.getItem('loginUser');
      if (userString) {
        const user = JSON.parse(userString);
        this.userEmail = user.email
        this.bookedservice.getBookings().subscribe((data)=>{
          if (Array.isArray(data)) {
              const userBookings = data.filter((booking: any) => booking.email === this.userEmail);
              this.userBooked$ = of(userBookings);
              userBookings.map(booking => {
                const currentTime = new Date();
                let newStatus: string;
                this.bookingId = booking.id
                console.log("🚀 ~ BookedpageComponent ~ this.bookedservice.getBookings ~ this.bookingId:", this.bookingId)
                const startDate = new Date(booking.startDate);
                const endDate = new Date(booking.endDate);
    
                if (endDate < currentTime) {
                  newStatus = 'ended';
                } else if (startDate > currentTime) {
                  newStatus = 'upcoming';
                } else {
                  newStatus = 'active';
                }

                this.bookedservice.updateBookingStatus(booking.id, newStatus).subscribe(response => {
                console.log('Booking status updated successfully:', response);
                
                if (this.userBooked$) {
                  this.userBooked$ = this.userBooked$.pipe(
                    map(bookings => {
                      return bookings.map((bookingItem: any) => {
                        if (bookingItem.id === booking.id) {
                          return { ...bookingItem, status: newStatus }; 
                        } else {
                          return bookingItem;
                        }
                      });
                    })
                  );
                }
              },
              error => {
                console.error('Error updating booking status:', error);
              });


              })
              
          } 
        })
    } 
  }
  }
  
  setBookingIdToDelete(bookingId: string) {
    this.deleteBookingId = bookingId;
  }

  deleteBookingConfirmation() {
    if (this.deleteBookingId) {
      this.bookedservice.deleteBooked(this.deleteBookingId).subscribe(() => {
        this.getBooked();
      });
    }
  }
}
