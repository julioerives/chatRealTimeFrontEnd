import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/authService/auth-service.service';
import { FriendsShow } from 'src/app/models/usuarios/friends';
import { Usuarios } from 'src/app/models/usuarios/usuarios';
import { Contexto } from 'src/app/services/contexto';
import { SpinnerService } from 'src/app/helpers/spinner/spinner.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { ModalAlertConfirmComponent } from 'src/app/shared/modalsAlert/modal-alert-confirm/modal-alert-confirm.component';
import { configAlert } from 'src/app/shared/modalsConfig/alertConfig';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  constructor(private contexto:Contexto,private auth:AuthServiceService,private spinner:SpinnerService,private modal:MatDialog){}
  private subscribtion = new Subscription
  pageUsers:number= 20;
  pageFriends:number=20;
  public data:Usuarios[]=[];
  public dataFriends:FriendsShow[]=[];
  public dataFollowing:FriendsShow[]=[];
  public dataFollowers:FriendsShow[]=[];
  
  
  ngOnInit(): void {
    this.spinner.showSpinner();
      this.getUsers();
      this.getFriends();    
      this.getFollowing();
      this.getFollowers();
  }
  getUsers(){
    this.subscribtion.add(
      this.contexto.users().getSearchFriends(this.auth.getId(),this.pageUsers).subscribe({
        next:(e)=>{
          if(e.error){
            return;
          }
          this.data = e.data;
        },
        error:(e)=>{
          console.log(e);
        }
      })
    )
  }
  getFriends(){
    this.subscribtion.add(
      this.contexto.users().getFriends(this.auth.getId()).subscribe({
        next:(e)=>{
          if(e.error){
            return
          }
          this.dataFriends = e.data;
        },
        error:(e)=>{
          console.log(e)
        }
      })
    )
  }
  getFollowing(){
    this.subscribtion.add(
      this.contexto.users().getFollowing(this.auth.getId()).subscribe({
        next:(e)=>{
      this.spinner.noShowSpinner();
      console.log(e);
          if(e.error){
            return
          }
          this.dataFollowing = e.data;
        },
        error:(e)=>{
          console.log(e)
        }
      })
    )
  }
  getFollowers(){
    this.subscribtion.add(
      this.contexto.users().getFollowers(this.auth.getId()).subscribe({
        next:(e)=>{
      this.spinner.noShowSpinner();
          if(e.error){
            return
          }
          this.dataFollowers = e.data;
        },
        error:(e)=>{
          console.log(e)
        }
      })
    )
  }
  addFriend(data:Usuarios){
    const modal= this.modal.open(ModalAlertConfirmComponent,{
      data:{
        message:"Estas seguro de querer agregar a esta persona?"
      },
      ...configAlert
    })

    this.subscribtion.add(
      this.contexto.users().addFriend(this.auth.getId(),data.id).subscribe({
        next:(e)=>{          
          console.log(e);
          this.getUsers();
        },
        error:(e)=>{
          console.log(e.message)
        }
      })
    )
    
  }
}
