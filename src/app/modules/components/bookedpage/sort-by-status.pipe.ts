import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByStatus'
})
export class SortByStatusPipe implements PipeTransform {
  
  transform(bookings: any[]): any[] {
    if (!bookings) {
      return [];
    }
    
    const sortedBookings = [...bookings];
    sortedBookings.sort((a, b) => {
      type StatusOrder = {
        [key: string]: number;
      };
      const statusOrder: StatusOrder = {
        active: 0,
        upcoming: 1,
        over: 2,
      };
      return statusOrder[a.status] - statusOrder[b.status];
    });
    
    return sortedBookings;
  }
}
