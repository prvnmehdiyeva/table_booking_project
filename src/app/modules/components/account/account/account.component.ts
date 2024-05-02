import { Component, OnInit } from '@angular/core';
import { AccountService } from './service/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
user:any;

constructor(private accountSrv:AccountService){}
  ngOnInit(): void {
    this.accountSrv.getUser().subscribe((user: any) => {
      this.user = user;
      console.log("🚀 ~ AccountComponent ~ this.accountSrv.getUser ~ this.user:", this.user)
    })
  }
  }
