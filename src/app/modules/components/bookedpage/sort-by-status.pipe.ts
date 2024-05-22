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
        active: 0,
        upcoming: 1,
        ended: 2
      };
      return statusOrder[a.status] - statusOrder[b.status];
    });
  }
}
