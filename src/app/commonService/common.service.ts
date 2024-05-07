import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }
  getBookings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/bookings`);
  }
  getSeats1(): Observable<any> {
    return this.http.get(`${this.baseUrl}/room1`);
  }
  getSeats2(): Observable<any> {
    return this.http.get(`${this.baseUrl}/room2`);
  }
  getSeats3(): Observable<any> {
    return this.http.get(`${this.baseUrl}/room3`);
  }

}
