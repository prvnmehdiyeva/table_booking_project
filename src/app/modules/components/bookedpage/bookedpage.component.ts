import { Component, Inject, Input, OnInit, PLATFORM_ID, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { BookedpageService } from './service/bookedpage.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

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
  filteredBookings$!: Observable<any>;
  statuses: any = [];
  deleteBookingId: string | null = null;
  bookingId: any;
  selectedStatus: string = '4';

  constructor(
    private bookedservice: BookedpageService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getBooked();
    this.getStatuses()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate'] || changes['endDate']) {
      this.userBooked$.subscribe(bookings => {
        this.updateBookingStatuses(bookings);
      });
    }
    if (changes['startDate'] || changes['endDate']) {
      this.userBooked$.subscribe(bookings => {
        this.deleteEndedBooking(bookings);
      });
    }
  }
  getStatuses() {
    this.bookedservice.getStatus().subscribe(statuses => {
      this.statuses = statuses;
    });  
  }
  getStatusName(statusId: number): string {
    const status = this.statuses.find((s: { id: string; }) => s.id === statusId.toString());
    return status ? status.name : '';
  }
  getBooked() {
    if (isPlatformBrowser(this.platformId)) {
      const userString = sessionStorage.getItem('loginUser');
      if (userString) {
        const user = JSON.parse(userString);
        this.userEmail = user.email;
        this.bookedservice.getBookings().subscribe((data) => {
          if (Array.isArray(data)) {
            const userBookings = data.filter((booking: any) => booking.email === this.userEmail);
            this.userBooked$ = of(userBookings);
            this.updateBookingStatuses(userBookings);
            this.deleteEndedBooking(userBookings)
          }
        });
      }
    }
  }

  deleteEndedBooking(bookings: any[]) {
    const currentTime = new Date();
    bookings.forEach(booking => {
      const endDate = new Date(booking.endDate);
      const sevenDaysAfter = new Date(endDate.getTime() + 7 * 24 * 60 * 60 * 1000);

      if (sevenDaysAfter < currentTime) {
        this.bookedservice.deleteBooked(booking.id).subscribe(() => {
          this.getBooked()
        });
      }
    });
  }

  updateBookingStatuses(bookings: any[]) {
    bookings.forEach(booking => {
      const currentTime = new Date();
      let newStatus: string;
      const startDate = new Date(booking.startDate);
      const endDate = new Date(booking.endDate);
      
      if (endDate < currentTime) {
        newStatus = "3";
      } else if (startDate > currentTime) {
        newStatus = "2";
      } else {
        newStatus = "1";
      }
 
      this.bookedservice.updateBookingStatus(booking.id, newStatus).subscribe(response => {
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
        this.applyStatusFilter();
      }, error => {
        console.error('Error updating booking status:', error);
      });
    });
  }
  
  applyStatusFilter() {
    if (this.selectedStatus === '4') {       
      this.filteredBookings$ = this.userBooked$;
    } else {
      this.filteredBookings$ = this.userBooked$.pipe(
        map(bookings => bookings.filter((booking: any) => booking.status === this.selectedStatus))
      );
    }
  }

  statusFilterChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedStatus = selectElement.value;
    this.applyStatusFilter();
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
