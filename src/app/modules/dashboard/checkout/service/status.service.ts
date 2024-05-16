import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  updateStatus(id:string, status:string): Observable<any> {
    return this.http.put(`${this.baseUrl}/bookings/${id}`, status);
  }
}
