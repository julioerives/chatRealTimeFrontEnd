import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './componentes/chat/chat.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { guardGuard } from './auth/guard/guard.guard';
const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"dashboard", component:DashboardComponent, canActivate:[guardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
