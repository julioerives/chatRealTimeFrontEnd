import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/angular-material/angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './componentes/chats/chat/chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketService } from './services/socket/socket.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { TokenInterceptorInterceptor } from './auth/tokenInterceptor/token-interceptor.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { FriendsComponent } from './componentes/friends/friends.component';
import { RegisterComponent } from './auth/register/register.component';
import { NewChatComponent } from './componentes/chats/new-chat/new-chat.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    FriendsComponent,
    RegisterComponent,
    NewChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [SocketService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
