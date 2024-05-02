import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookedpageComponent } from './components/bookedpage/bookedpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountComponent } from './components/account/account/account.component';
import { ContactComponent } from './components/contact/contact/contact.component';

const routes: Routes = [
  {  
    path:'',
    redirectTo:'login',
    pathMatch:'full'  
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'main',
    component: NavbarComponent, 
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'booked',
        component: BookedpageComponent
      },
      {
        path: 'account',
        component: AccountComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
