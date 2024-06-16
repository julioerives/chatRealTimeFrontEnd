import { HttpClient } from "@angular/common/http";
import { LoginService } from "./login/login.service";
import { Component,Injectable  } from '@angular/core';
import { ChatsService } from "./chats/chats.service";
@Injectable({
  providedIn: 'root'
})
export class Contexto{
    public login:LoginService;
    public chats:ChatsService;
    constructor(private http:HttpClient){
        this.login = new LoginService(this.http);
        this.chats = new ChatsService(this.http);
    }
    loginUser():LoginService{
        return this.login;
    }
    chatsUser():ChatsService{
        return this.chats;
    }
}