import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './componentes/chats/chat/chat.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { guardGuard } from './auth/guard/guard.guard';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { FriendsComponent } from './componentes/friends/friends.component';
import { RegisterComponent } from './auth/register/register.component';
const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"dashboard", component:SidebarComponent, canActivateChild:[guardGuard],children:[
    {path:"", component:DashboardComponent},
    {path:"friends", component:FriendsComponent}
    
  ]},
  {
    path:"**", redirectTo:"login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
