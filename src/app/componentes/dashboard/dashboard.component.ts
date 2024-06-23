import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/authService/auth-service.service';
import { Chats } from 'src/app/models/chats/chats.model';
import { ChatsService } from 'src/app/services/chats/chats.service';
import { Contexto } from 'src/app/services/contexto';
import { ChatComponent } from '../chats/chat/chat.component';
import { MatDialog } from '@angular/material/dialog';
import { configChats,configNewChat } from 'src/app/shared/modalsConfig/chatConfig';
import { Router } from '@angular/router';
import { NewChatComponent } from '../chats/new-chat/new-chat.component';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { ModalAlertComponent } from 'src/app/shared/modalsAlert/modal-alert/modal-alert.component';
import { configAlert } from 'src/app/shared/modalsConfig/alertConfig';
import { ErrorShowService } from 'src/app/shared/errorsMethods/error-show.service';
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
    private router:Router,
    private spinner:SpinnerService,
    private errorService:ErrorShowService
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
    this.spinner.showSpinner()
    this.subscription.add(
      this.services.chatsUser().getChats(this.id).subscribe({
        next:(e)=>{
          this.spinner.noShowSpinner();
          if(e.error){
            // this.errorService.showError(e)
            return
          }
          this.data = e.data;
          
        },
        error:(e)=>{
          this.errorService.showError(e)
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
  openNewChat(){
    const dialog = this.modal.open(NewChatComponent,{
      ...configNewChat
    })
  }
 
}
