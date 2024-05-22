import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TableStylesComponent } from '../admin/admin/components/table-styles/table-styles.component';
import { LOCALE_ID } from '@angular/core';



@NgModule({
  declarations: [
    TableStylesComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: DatePipe, useClass: DatePipe, deps: [LOCALE_ID] }
  ],
  exports: [
    TableStylesComponent
  ] 
})
export class SharedModule { }
 