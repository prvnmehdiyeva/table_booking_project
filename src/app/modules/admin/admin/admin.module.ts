import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DevspaceComponent } from './components/devspace/devspace.component';
import { CounterComponent } from './components/counter/counter/counter.component';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CodeloungeComponent } from './components/codelounge/codelounge.component';
import { BytelabComponent } from './components/bytelab/bytelab.component';


@NgModule({
  declarations: [
    AdminComponent,
    DevspaceComponent,
    CounterComponent,
    BreadcrumbComponent,
    CodeloungeComponent,
    BytelabComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
