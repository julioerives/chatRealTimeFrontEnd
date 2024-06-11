import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  private subscription: Subscription = new Subscription();
  public messages: any[] = [];
  public message: string = "";
  id_user:number = 1;
  constructor(private socketService: SocketService, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getPreviousMessage()
    this.formMessage();
    this.getMessage()

  }

  ngOnDestroy(): void {
    
    this.subscription.unsubscribe();
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
    if(this.form.valid){
      this.socketService.sendMessage({id_user:this.id_user, mensaje:this.form.value.message});
      this.form.reset();
    }
  }
  getPreviousMessage(): void {
    this.subscription.add(
      this.socketService.onPreviousMessages().subscribe((data:any) => {
        this.messages = data;
      })
    )
  }
}