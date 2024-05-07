import { Component, Renderer2 } from '@angular/core';
import { CommonService } from '../../../../../commonService/common.service';
import { BytelabService } from './service/bytelab.service';

@Component({
  selector: 'app-bytelab',
  templateUrl: './bytelab.component.html',
  styleUrl: './bytelab.component.scss'
})
export class BytelabComponent {
  table1Seats:any[]=[]
  table1Id:any[]=[]
  roomName!:string
  roomDes!:string
  rowLength!:number
  numToAdd!: number ; 
  numToDelete!: number ;
  available!:number

  constructor(
    private srv:CommonService,
    private renderer: Renderer2,
    private labSrv:BytelabService
  )
  {}
  
  ngOnInit(): void {
    this.fetchSeats()
    this.availableSeats()
  }
  fetchSeats(){
    this.srv.getSeats3().subscribe((data)=>{
      this.rowLength = data.length
     let i = data.length;
     this.roomName=data[0].name
     this.roomDes=data[0].des
     this.table1Seats = [data[0].id, data[1].id];
     this.table1Seats = data.slice(0, i).map((item: { id: any; }) => item.id);
     this.table1Id = data[i - 1].seats;

    })
   }
   availableSeats(){
    this.srv.getBookings().subscribe((data) => {
      let room1BookingCount = 0; 
    
      data.forEach((booked: any) => {
        if (booked.roomNumber === "3") {
         room1BookingCount++; 
         console.log(this.rowLength);
         console.log(room1BookingCount);
         this.available = this.rowLength * 5 - room1BookingCount
        }
      });
    
      console.log("Total bookings for room 3:", room1BookingCount);
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
                "C",
                "D",
                "E"
            ]
        };
        this.labSrv.addRow(newRow).subscribe(() => {
            this.fetchSeats();
            this.numToAdd = 0
        });
    }
}

delRow(){
  const numToDelete = parseInt(this.numToDelete.toString());
  for(let i = 0; i < numToDelete; i++) {
      const rowIdToDelete = this.rowLength - i;
      this.labSrv.delRow(rowIdToDelete).subscribe(() => {
          this.fetchSeats();
          this.numToDelete = 0
      });
  }
}
}
