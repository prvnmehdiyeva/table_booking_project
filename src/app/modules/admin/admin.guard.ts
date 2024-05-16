import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { CommonService } from '../../commonService/common.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  showAdmin: boolean = false;

  constructor(
    private srv: CommonService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const userString = sessionStorage.getItem('loginUser');
      if (userString) {
        const user = JSON.parse(userString); 
        this.srv.getUsers().subscribe((data) => {
          this.showAdmin = data.some((userData: any) => userData.email === user.email && userData.role === 'admin');
          if (!this.showAdmin) {
            this.router.navigate(['/login']);
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']); 
    }
    return this.showAdmin;
  }
}
