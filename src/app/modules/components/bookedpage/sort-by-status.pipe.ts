import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByStatus'
})
export class SortByStatusPipe implements PipeTransform {
  
  transform(bookings: any[]): any[] {
    if (!bookings || !bookings.length) {
      return [];
    }
    
    return bookings.sort((a: any, b: any) => {
      const statusOrder: { [key: string]: number } = {
        1: 0,
        2: 1,
        3: 2
      };
      return statusOrder[a.status] - statusOrder[b.status];
    });
  }
}
