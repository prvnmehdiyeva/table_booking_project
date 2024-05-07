import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonService } from '../../commonService/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  showAdmin: boolean = false

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) public document: Document,
    private srv:CommonService
  ) 
  {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userString = sessionStorage.getItem('loginUser')
      if(userString){
        const user = JSON.parse(userString); 
        this.srv.getUsers().subscribe((data)=>{
          data.forEach((users:any)=>{
            if(user.role){
              this.showAdmin = true
            }
          })
        })
      }
    }
  }
  
  
}
