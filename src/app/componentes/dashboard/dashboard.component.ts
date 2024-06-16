import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/authService/auth-service.service';
import { Chats } from 'src/app/models/chats/chats.model';
import { ChatsService } from 'src/app/services/chats/chats.service';
import { Contexto } from 'src/app/services/contexto';
import { ChatComponent } from '../chat/chat.component';
import { MatDialog } from '@angular/material/dialog';
import { configChats } from 'src/app/shared/modalsConfig/chatConfig';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {
  id:number|string = 0;
  data: Chats[]=[];
  constructor(private services:Contexto,
    private authService:AuthServiceService,
    private modal:MatDialog,
    private router:Router
  ){}
  private subscription = new Subscription
  
  ngOnInit(): void {
      this.getID();
      this.getChats();
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
  getID(){
    this.id=this.authService.getId()
  }
  getChats(){
    this.subscription.add(
      this.services.chatsUser().getChats(this.id).subscribe({
        next:(e)=>{
          console.log("Hola")
          if(e.error){
            console.log(e)
            return
          }
          this.data = e.data;
        },
        error:(e)=>{
          console.log(e)
        }
      })
    )
  }
  openChat(data:any){
    this.authService.setChatId(data.id_chat);
    const dialog = this.modal.open(ChatComponent,{
      data:data,
      ...configChats
    })
  }
  cerrarSesion(){
    this.authService.removeCredencial();
    this.authService.removeChatId();
    this.router.navigate(['login'])
  }
}
