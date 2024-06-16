import { Injectable } from '@angular/core';
import { Main } from '../main';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from 'src/app/models/response';
@Injectable({
  providedIn: 'root'
})
export class ChatsService extends Main {

  constructor(private cliente: HttpClient) { 
    super(cliente,"chats");
  }
  getChats(idUser:string |number):Observable<Response>{
    console.log(idUser)
    return this.cliente.get<Response>(this.url+"/chatsUser/"+idUser)
  }
}
