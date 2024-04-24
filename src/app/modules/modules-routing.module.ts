import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookpageComponent } from './bookpage/bookpage.component';

const routes: Routes = [
  {  
    path:'',
    redirectTo:'login',
    pathMatch:'full'  
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    component:DashboardComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      }
      

    ]
  },
  {
    path:'booking',
    component:BookpageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
