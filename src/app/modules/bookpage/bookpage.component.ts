import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookpageserviceService } from './services/bookpageservice.service';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookpage',
  templateUrl: './bookpage.component.html',
  styleUrl: './bookpage.component.scss'
})
export class BookpageComponent implements OnInit {
  updateUserBookings$!: Observable<any>;
  tableNumber: any;
  @Input() selectedSeatId: any = '';
  @Input() userId: any = '';
  selectedTable: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  updatedUser: any;
  isBooked: boolean = false;

  constructor(
    private bookService:BookpageserviceService,
    private snackBar: MatSnackBar,
    private router:Router
  )
  {}

  

  ngOnInit() {
    this.selectedSeatId = sessionStorage.getItem('selectedSeatId')
  
    
  }
  updateUserBookings() {
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
    if (this.updatedUser) {
      console.log(this.selectedTable);
      this.bookService.updateUser(this.userId, this.updatedUser)
        .subscribe(() => {
          
          this.isBooked = true
          this.snackBar.open('Booked Successfully', 'Finish', { duration: 3000 });

        setTimeout(()=>{
          this.selectedTable = '';
        this.checkInDate = '';
        this.checkOutDate = '';
          this.router.navigate(['dashboard'])
        },3000)

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


