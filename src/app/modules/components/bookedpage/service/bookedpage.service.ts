import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookedpageService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient,@Inject(PLATFORM_ID) private platformId: Object,) { }

  getBookings(){
    return this.http.get(`${this.baseUrl}/bookings`)
   }

  deleteBooked(bookingId:any){
   return this.http.delete<void>(`${this.baseUrl}/bookings/${bookingId}`)
  }

  updateBookingStatus(bookingId: any, newStatus: string): Observable<any> {
    const url = `${this.baseUrl}/bookings/${bookingId}`;
    return this.http.patch(url, { status: newStatus });
  }

 
}
