import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookedpageComponent } from './components/bookedpage/bookedpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountComponent } from './components/account/account/account.component';
import { ContactComponent } from './components/contact/contact/contact.component';
import { AdminComponent } from './admin/admin/admin.component';
import { DevspaceComponent } from './admin/admin/components/devspace/devspace.component';
import { CodeloungeComponent } from './admin/admin/components/codelounge/codelounge.component';
import { BytelabComponent } from './admin/admin/components/bytelab/bytelab.component';
import { AdminGuard } from './admin/admin.guard';

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
      },
     
      {
        path: 'admin',
        canActivate: [AdminGuard], 
        children: [
         
          {
            path: '',
            component: AdminComponent,
          },
          {
            path: 'devspace',
            component: DevspaceComponent,
          },
          {
            path: 'codelounge',
            component: CodeloungeComponent,
          },
          {
            path: 'bytelab',
            component: BytelabComponent,
          }
        ],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
