import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModulesRoutingModule } from './modules/modules-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MbscModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ModulesRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule
  ],
  providers: [
    provideAnimationsAsync(),
    MessageService
    

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
