import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }
  getBookings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/bookings`);
  }

  addBook(updatedUser: any): Observable<any> {
    const url = `${this.baseUrl}/bookings`;
    return this.http.post(url, updatedUser);
  }
  
}
