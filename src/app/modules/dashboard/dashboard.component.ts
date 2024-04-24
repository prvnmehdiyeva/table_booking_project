import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  @Output() seatSelected = new EventEmitter<string>();
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,

  )
  {}
  ngOnInit() {
  }
  onSeatClicked(seatId:any){
    console.log("🚀 ~ DashboardComponent ~ onSeatClicked ~ seatId:", seatId)
    if(isPlatformBrowser(this.platformId)){
      sessionStorage.setItem('selectedSeatId', seatId); 
}   
  

  }

  

}
