import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/authService/auth-service.service';
import { Friends } from 'src/app/models/usuarios/friends';
import { Contexto } from 'src/app/services/contexto';
import { SpinnerService } from 'src/app/helpers/spinner/spinner.service';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.scss']
})
export class NewChatComponent implements OnInit {
  public form!: FormGroup;
  constructor(private contexto: Contexto,
    private authService:AuthServiceService,
    private _form:FormBuilder,
    private spinner: SpinnerService
  ){}
  private subscription: Subscription = new Subscription();
  public userFriends: Friends[]=[];
  ngOnInit(): void {
      this.getFriends();
      this.getForm();
  }
  getFriends(){
    this.subscription.add(
      this.contexto.users().getFriends(this.authService.getId()).subscribe({
        next:(e)=>{
          if(e.error){
            return;
          }
          this.userFriends = e.data;
        }
      })
    )
  }
  getForm(){
    this.form = this._form.group({
      nombre:new FormControl("", [Validators.required]),
      descripcion:new FormControl("", [Validators.required,Validators.maxLength(300)]),
      friends: new FormControl("", [Validators.required])
    })
  }
  getValueFriends():any{
    const data = this.form.get("friends")?.value
    return  data || [];
  }
  cancelar(){
    this.form.reset();
  }
  submit(){
    console.log(this.form.valid)
    if(!this.form.valid){
      return
    }
    this.spinner.showSpinner();
    const dataChats = this.form.value
    console.log(dataChats);
    this.subscription.add(
    this.contexto.chatsUser().insertChat({id:this.authService.getId(),...dataChats}).subscribe({
      next:(e)=>{
        this.spinner.noShowSpinner()
        if(e.error){
          
          return
        }
        
      },
      error:(e)=>{
        this.spinner.noShowSpinner()
        console.error(e)
      }
    })

    )
  }
}
