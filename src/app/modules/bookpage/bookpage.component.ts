import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookpageserviceService } from './services/bookpageservice.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-bookpage',
  templateUrl: './bookpage.component.html',
  styleUrl: './bookpage.component.scss'
})
export class BookpageComponent implements OnInit {
  updateUserBookings$!: Observable<any>;

  constructor(
    private bookService:BookpageserviceService
  )
  {}

  @Input() selectedSeatId: any = '';
  @Input() userId: any = '';
  selectedTable: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  updatedUser: any;

  ngOnInit() {
    this.selectedSeatId = sessionStorage.getItem('selectedSeatId')
    const userString = sessionStorage.getItem('loginUser');
    if (userString) {
      const user = JSON.parse(userString);
      this.userId = user.id;
      
      this.updatedUser = {
        ...user, 
        bookings: [
          {
            id: uuidv4(),
            tableNumber: this.selectedTable,
            seatNumber: this.selectedSeatId, 
            startDate: this.checkInDate,
            endDate: this.checkOutDate
          },
        ]
      };
    }
    
  }
  updateUserBookings() {
    if (this.updatedUser) {
      this.bookService.updateUser(this.userId, this.updatedUser)
        .subscribe(() => {
          console.log('User updated successfully');
        }, error => {
          console.error('Error updating user:', error);
        });
    }
  }
  
  onSubmit() {
    this.updateUserBookings();
  }

}


