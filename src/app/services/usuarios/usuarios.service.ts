import { Injectable } from '@angular/core';
import { Main } from '../main';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from 'src/app/models/response';
import { Usuarios } from 'src/app/models/usuarios/usuarios';
import { Friends, FriendsShow } from 'src/app/models/usuarios/friends';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends Main<Usuarios> {

  constructor(private _cliente:HttpClient) { 
    super(_cliente,"user")
  }
  getSearchFriends(id:string|number,count:number):Observable<Response<Usuarios[]>>{
    return this._cliente.get<Response<Usuarios[]>>(this.url+"/user",{
      params:{id:id,page:count}
    })
  }
  addFriend(idUser:string|number,idFriend:string | number){
    return this._cliente.post<Response<Usuarios[]>>(this.url+"/addFriend",{idSeguidor:idUser,idSeguido:idFriend});
  }
  getFriends(idUser:string):Observable<Response<FriendsShow[]>>{
    return this._cliente.get<Response<FriendsShow[]>>(this.url+"/friends",{
      params: {id:idUser}
    })
  }
  getFollowing(idUser:string):Observable<Response<FriendsShow[]>>{
    return this._cliente.get<Response<FriendsShow[]>>(this.url+"/following",{
      params: {id:idUser}
    })
  }
  getFollowers(idUser:string):Observable<Response<FriendsShow[]>>{
    return this._cliente.get<Response<FriendsShow[]>>(this.url+"/followers",{
      params: {id:idUser}
    })
  }
}
