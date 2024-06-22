import { HttpClient } from "@angular/common/http";
import { LoginService } from "./login/login.service";
import { Component,Injectable  } from '@angular/core';
import { ChatsService } from "./chats/chats.service";
import { UsuariosService } from "./usuarios/usuarios.service";
@Injectable({
  providedIn: 'root'
})
export class Contexto{
    private login:LoginService;
    private chats:ChatsService;
    private usuarios:UsuariosService;
    constructor(private http:HttpClient){
        this.login = new LoginService(this.http);
        this.chats = new ChatsService(this.http);
        this.usuarios = new UsuariosService(this.http);
    }
    loginUser():LoginService{
        return this.login;
    }
    chatsUser():ChatsService{
        return this.chats;
    }
    users():UsuariosService{
        return this.usuarios
    }
}