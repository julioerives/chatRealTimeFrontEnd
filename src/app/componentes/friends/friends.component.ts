import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/authService/auth-service.service';
import { Usuarios } from 'src/app/models/usuarios/usuarios';
import { Contexto } from 'src/app/services/contexto';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  constructor(private contexto:Contexto,private auth:AuthServiceService){}
  private subscribtion = new Subscription
  page:number= 20;
  public data:Usuarios[]=[];
  ngOnInit(): void {
      this.getUsers();
  }
  getUsers(){
    console.log(this.auth.getId())
    this.subscribtion.add(
      this.contexto.users().getSearchFriends(this.auth.getId(),this.page).subscribe({
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
  addFriend(data:Usuarios){
    console.log(data)
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
