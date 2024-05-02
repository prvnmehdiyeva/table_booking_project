import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
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
    ToastModule
    
  ],
  exports: [
    DashboardComponent
  ],
  providers: [
    MessageService 
  ],
 
})
export class DashboardModule { }
