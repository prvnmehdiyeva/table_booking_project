import { Injectable } from '@angular/core';
import { Observable, switchMap, throwError } from 'rxjs';
import { UserBooking } from '../../../models/user-booking';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookpageserviceService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  updateUser(userId: number, updatedUser: any): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.put(url, updatedUser);
  }
 
}
