import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { BookedpageService } from './service/bookedpage.service';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { DashboardService } from '../../dashboard/services/dashboard.service';

@Component({
  selector: 'app-bookedpage',
  templateUrl: './bookedpage.component.html',
  styleUrl: './bookedpage.component.scss'
})
export class BookedpageComponent implements OnInit {
  @Input() selectedSeat: any = ''; 
  @Input() userEmail: any = ''; 
  @Input() selectedTable: any = ''; 
  @Input() startDate: any;
  @Input() endDate:any;
  userBooked$!: Observable<any>;
  deleteBookingId: string | null = null;


constructor(
  private bookedservice:BookedpageService,
  private userService:DashboardService,
  @Inject(PLATFORM_ID) private platformId: Object,

)
{}

  ngOnInit() {
    this.getBooked()
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
      this.getBooked()

    });
  }

}

}
