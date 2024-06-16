import { Injectable } from '@angular/core';
import { Credential } from 'src/app/models/auth/credential';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private credencial:string = "credencial"
  private chat:string = "chat"
  constructor() { }
  setCredencial(credencial:any) {
    console.log(credencial);
    console.log(JSON.stringify(credencial))
    localStorage.setItem(this.credencial, JSON.stringify(credencial));
  }
  getCredencial():any {
    const credencial = localStorage.getItem(this.credencial);
    console.log(credencial);
    if(credencial){
      return JSON.parse(credencial)
    }
    return false ;
  }
  removeCredencial() {
    localStorage.removeItem('credencial');
  }
  getToken(){
    return this.getCredencial().token;
  }
  getId(){
    return this.getCredencial().id;
  }
  setChatId(id:string){
    const idChat = `${id}`;
    localStorage.setItem(this.chat,idChat)
  }
  getChatId():string |null{
    console.log(localStorage.getItem(this.chat))
    return localStorage.getItem(this.chat);
  }
  removeChatId(){
    localStorage.removeItem(this.chat)
  }

}
