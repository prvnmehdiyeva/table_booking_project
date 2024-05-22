import { Component, ElementRef, OnInit, ViewChild,AfterViewInit, Renderer2,Inject,
  PLATFORM_ID } from '@angular/core';
import { CommonService } from '../../../../../commonService/common.service';
import { DevspaceService } from './service/devspace.service';
import { StyleService } from '../../../../../styleservice/style.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-devspace',
  templateUrl: './devspace.component.html',
  styleUrl: './devspace.component.scss'
})
export class DevspaceComponent implements OnInit {
  @ViewChild('counters') counters!: ElementRef;

  style1Seats:any[]=[]
  style2Seats:any[]=[]
  style1Id:string[]=[]
  table2Id:any[]=[]
  roomName!:string
  roomDes!:string
  rowLength!:number
  doubleSeatLength!:number
  numToAdd!: number ; 
  numToDelete!: number ;
  available!: number
  selectedStyle: string | null = 'styleSingle4';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,

    private srv:CommonService,
    private renderer: Renderer2,
    private devSrv:DevspaceService,
    private styleSrv:StyleService
  )
  {}
  
  ngOnInit(): void {
    this.fetchSeats()
    this.availableSeats()
  }
  
  fetchSeats(){
    this.srv.getSeats1().subscribe((data)=>{
      console.log(data);
      this.rowLength = data.length
     let i = data.length;
     if (i > 0) {
     this.roomName=data[0].name
     this.roomDes=data[0].des
     this.style1Seats = [data[0].id, data[1].id];
     let style2length = i
     this.style1Seats = data.slice(0, i).map((item: { id: any; }) => item.id);
     this.style2Seats = Array.from({ length: style2length });
     this.doubleSeatLength = style2length * 3
     if (i > 0) {
      this.style1Id = data[i - 1].seats;
    }

     console.log(this.style1Seats);
     console.log(this.style2Seats);
     
     }
    })
   }

   availableSeats(){
    this.srv.getBookings().subscribe((data) => {
      let room1BookingCount = 0; 
    
      data.forEach((booked: any) => {
        if (booked.roomNumber === "1") {
         room1BookingCount++; 
         this.available = this.rowLength * 3 - room1BookingCount
        }
      });
    
      console.log("Total bookings for room 1:", room1BookingCount);
    });
    
   }
   
   addRow(){
    const numToAdd = parseInt(this.numToAdd.toString()); 
    for(let i = 0; i < numToAdd; i++) {
        const newRow = {
            "name": this.roomName,
            "des": this.roomDes,
            "id": (this.rowLength + 1 + i).toString(),
            "seats": [
                "A"
            ]
        };
        this.devSrv.addRow(newRow).subscribe(() => {
            this.fetchSeats();
            this.numToAdd = 0
        });
    }
}

delRow(){
  const numToDelete = parseInt(this.numToDelete.toString());
  for(let i = 0; i < numToDelete; i++) {
      const rowIdToDelete = this.rowLength - i;
      this.devSrv.delRow(rowIdToDelete).subscribe(() => {
          this.fetchSeats();
          this.numToDelete = 0
      });
  }
}



selectStyle(style: string) {
  if (isPlatformBrowser(this.platformId)) {
  this.selectedStyle = style;
  this.styleSrv.setSelectedStyle(style);
  
  sessionStorage.setItem("selectedStyle", style)

    if(this.selectedStyle === 'styleSingle1'){
      this.fetchSeats()
    } 

  }
}

  //  ngAfterViewInit(): void {
  //   if (this.counters) {
  //     const initialValue = parseInt(this.counters.nativeElement.innerText);
  //     this.animateCounter(this.counters.nativeElement, initialValue);
  //   }
  // }

  // private animateCounter(element: HTMLElement, initialValue: number): void {
  //   let start = 0;
  //   let end = initialValue;
  //   const duration = 4000;
  //   const range = end - start;
  //   let current = start;
  //   const increment = end > start ? 1 : -1;
  //   const stepTime = Math.abs(Math.floor(duration / range));

  //   const timer = setInterval(() => {
  //     current += increment;
  //     this.renderer.setProperty(element, 'innerText', Math.ceil(current).toString());
  //     if (current === end) {
  //       clearInterval(timer);
  //     }
  //   }, stepTime);
  // }

  
 
   
 }
