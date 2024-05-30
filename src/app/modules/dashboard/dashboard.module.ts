import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatButtonModule } from '@angular/material/button';
import {  MbscModule} from '@mobiscroll/angular';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard.component';
import { MessageService } from 'primeng/api';

import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableStylesComponent } from '../admin/admin/components/table-styles/table-styles.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    CheckoutComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MbscModule,
    ToastModule,    
    SharedModule, 
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    DashboardComponent,
     
  ],
  providers: [
    MessageService,
    DatePipe
  ],
  
 
})
export class DashboardModule { }
