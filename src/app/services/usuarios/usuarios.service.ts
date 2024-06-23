import { Injectable } from '@angular/core';
import { Main } from '../main';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from 'src/app/models/response';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends Main {

  constructor(private _cliente:HttpClient) { 
    super(_cliente,"user")
  }
  getSearchFriends(id:string|number,count:number):Observable<Response>{
    return this._cliente.get<Response>(this.url+"/user",{
      params:{id:id,page:count}
    })
  }
  addFriend(idUser:string|number,idFriend:string | number){
    return this._cliente.post<Response>(this.url+"/addFriend",{idSeguidor:idUser,idSeguido:idFriend});
  }
  getFriends(idUser:string){
    return this._cliente.get<Response>(this.url+"/friends",{
      params: {id:idUser}
    })
  }
  getFollowing(idUser:string){
    return this._cliente.get<Response>(this.url+"/following",{
      params: {id:idUser}
    })
  }
  getFollowers(idUser:string){
    return this._cliente.get<Response>(this.url+"/followers",{
      params: {id:idUser}
    })
  }
}
