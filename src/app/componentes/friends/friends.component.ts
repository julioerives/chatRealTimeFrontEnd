import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/authService/auth-service.service';
import { FriendsShow } from 'src/app/models/usuarios/friends';
import { Usuarios } from 'src/app/models/usuarios/usuarios';
import { Contexto } from 'src/app/services/contexto';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  constructor(private contexto:Contexto,private auth:AuthServiceService,private spinner:SpinnerService){}
  private subscribtion = new Subscription
  pageUsers:number= 20;
  pageFriends:number=20;
  public data:Usuarios[]=[];
  public dataFriends:FriendsShow[]=[];
  
  ngOnInit(): void {
    this.spinner.showSpinner();
      this.getUsers();
      this.getFriends();    
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
      this.spinner.noShowSpinner();
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
  addFriend(data:Usuarios){
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
