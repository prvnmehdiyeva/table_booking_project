import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';
import {DpDatePickerModule} from 'ng2-date-picker';
import { BookedpageComponent } from './components/bookedpage/bookedpage.component';
import { AccountComponent } from './components/account/account/account.component';
import { ContactComponent } from './components/contact/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { SortByStatusPipe } from './components/bookedpage/sort-by-status.pipe';


@NgModule({
  declarations: [
    ModulesComponent,
    BookedpageComponent,
    AccountComponent,
    ContactComponent,
    SortByStatusPipe,
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    DpDatePickerModule,
    ReactiveFormsModule,
    ToastModule
    
  ]
})
export class ModulesModule { }
