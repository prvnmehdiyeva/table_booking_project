import { Component, ElementRef, OnInit, ViewChild,AfterViewInit, Renderer2 } from '@angular/core';
import { CommonService } from '../../../../../commonService/common.service';
import { DevspaceService } from './service/devspace.service';

@Component({
  selector: 'app-devspace',
  templateUrl: './devspace.component.html',
  styleUrl: './devspace.component.scss'
})
export class DevspaceComponent implements OnInit {
  @ViewChild('counters') counters!: ElementRef;

  table1Seats:any[]=[]
  table1Id:any[]=[]
  roomName!:string
  roomDes!:string
  rowLength!:number
  numToAdd!: number ; 
  numToDelete!: number ;
  available!: number

  constructor(
    private srv:CommonService,
    private renderer: Renderer2,
    private devSrv:DevspaceService
  )
  {}
  
  ngOnInit(): void {
    this.fetchSeats()
    this.availableSeats()
  }
  fetchSeats(){
    this.srv.getSeats1().subscribe((data)=>{
      this.rowLength = data.length
     let i = data.length;
     this.roomName=data[0].name
     this.roomDes=data[0].des
     console.log("🚀 ~ DevspaceComponent ~ this.srv.getSeats ~ this.roomName:", this.roomName)
     this.table1Seats = [data[0].id, data[1].id];
     this.table1Seats = data.slice(0, i).map((item: { id: any; }) => item.id);
     this.table1Id = data[i - 1].seats;
    })
   }

   availableSeats(){
    this.srv.getBookings().subscribe((data) => {
      let room1BookingCount = 0; 
    
      data.forEach((booked: any) => {
        if (booked.roomNumber === "1") {
         room1BookingCount++; 
         console.log(this.rowLength);
         console.log(room1BookingCount);
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
                "A",
                "B",
                "C"
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
