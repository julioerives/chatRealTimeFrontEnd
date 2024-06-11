import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000',{
      query:{
        idChat:1
      }
    });
  }

  sendMessage(message: any) {
    console.log(message);
    this.socket.emit('chat', message);
  }

  onMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('chat', (msg: string) => {
        observer.next(msg);
      });
    });
  }
  onPreviousMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('previous messages', (messages) => {
        observer.next(messages);
      });
    });
  }
}
