import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevspaceService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  addRow(newRow:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/room1`, newRow);
  }
  delRow(rowNumber:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/room1/${rowNumber}`);
  }
}
