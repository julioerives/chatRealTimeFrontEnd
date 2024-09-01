import { Injectable } from '@angular/core';
import { Main } from '../main';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from 'src/app/models/response';
import { Chats } from 'src/app/models/chats/chats.model';
@Injectable({
  providedIn: 'root'
})
export class ChatsService extends Main<Chats> {

  constructor(private cliente: HttpClient) { 
    super(cliente,"chats");
  }
  getChats(idUser:string |number):Observable<Response<Chats[]>>{
    console.log(idUser)
    return this.cliente.get<Response<Chats[]>>(this.url+"/chatsUser/"+idUser)
  }
  insertChat(data:any):Observable<Response<Chats[]>>{
    return this.cliente.post<Response<Chats[]>>(this.url+"/chatsUser",data)
  }
}
