import { Component, OnInit, OnDestroy,Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/services/socket/socket.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth/authService/auth-service.service';
import { AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  @ViewChild('message') contenido!: ElementRef;
  private subscription: Subscription = new Subscription();
  public messages: any[] = [];
  public bandera: boolean = false;
  public message: string = "";
  id_user:number = 1;
   
    constructor( @Inject(MAT_DIALOG_DATA) public data: any,private socketService: SocketService, private _formBuilder: FormBuilder,private authService:AuthServiceService,private cdr: ChangeDetectorRef,private spinner:SpinnerService) {}

  ngOnInit(): void {
    this.socketService.initializeSocket();

    this.getPreviousMessage();
    this.formMessage();
    this.getMessage();
    this.changeID();
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.socketService.disconnect();
  }

  changeID() {
    this.id_user = this.authService.getId();
  }

  formMessage(): void {
    this.form = this._formBuilder.group({
      message: new FormControl("")
    });
  }

  getMessage(): void {
    this.subscription.add(
      this.socketService.onMessage().subscribe((message: any) => {
        this.messages.push(message);
      })
    );
  }

  sendMessage(): void {
    if (this.form.valid) {
      this.socketService.sendMessage({ id_user: this.id_user, mensaje: this.form.value.message });
      this.form.reset();
    }
  }

  getPreviousMessage(): void {
    this.subscription.add(
      this.socketService.onPreviousMessages().subscribe((data: any) => {
        this.messages = data;
      })
    );
  }

  scrollToBottom(): void {
    try {
      const contenido = this.contenido.nativeElement;
      contenido.scrollTop = contenido.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  cerrarModal() {
    this.authService.removeChatId();
  }

}