import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroments';
import { AuthServiceService } from 'src/app/auth/authService/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;

  constructor(private authService: AuthServiceService) {
    this.initializeSocket();
  }

  initializeSocket() {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.socket = io(enviroment.URL_SERVICES, {
      query: {
        idChat: this.authService.getChatId()
      }
    });
  }

  sendMessage(message: any) {
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
        console.log("Hola");
        observer.next(messages);
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}