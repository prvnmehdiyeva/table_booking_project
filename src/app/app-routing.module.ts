import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './modules/admin/admin.guard';

const routes: Routes = [{ path: 'modules', loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule) }, { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) }, { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) }, { path: 'navbar', loadChildren: () => import('./modules/navbar/navbar.module').then(m => m.NavbarModule) }, { path: 'admin', loadChildren: () => import('./modules/admin/admin/admin.module').then(m => m.AdminModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminGuard] 
})
export class AppRoutingModule { }
