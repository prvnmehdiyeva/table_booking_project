import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://localhost:3000';
  userId:any
  constructor(private http:HttpClient,@Inject(PLATFORM_ID) private platformId: Object) { }

  getUser(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      const userString = sessionStorage.getItem('loginUser');
      if (userString) {
        const user = JSON.parse(userString);
        this.userId = user.id;
        console.log("🚀 ~ AccountService ~ getUser ~ this.userId:", this.userId)
        return this.http.get(`${this.baseUrl}/users/${this.userId}`);
      }
    }
    return of (null); 
  }

}
