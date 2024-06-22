import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Register, login } from 'src/app/models/auth/login';
import { Contexto } from 'src/app/services/contexto';
import { Router } from '@angular/router';
import { AuthServiceService } from '../authService/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public form=this._form.group({
    correo: new FormControl("",[Validators.required,Validators.email]),
    nombreUsuario: new FormControl("",[Validators.required]),
    contraseña: new FormControl("",[Validators.required]),

  });
  private subscription = new Subscription
  constructor(public _form:FormBuilder,
    private ctx:Contexto,
    private router:Router,
    private authService:AuthServiceService
  ){

  }
  ngOnInit(): void {
      
  }
  formLogin(){
  
  }
  enviar(){
    const data = this.form.value as Register;
    this.subscription.add(
      this.ctx.users().insert(data).subscribe({
        next:(e)=>{
          if(e.error){
            console.log(e.message);
            return;
          }
          console.log(e);
          this.authService.setCredencial(e.data)
          this.router.navigate(["dashboard/"]);

        },
        error:(e)=>{
          console.log(e);
        }
      })
    )
  }
}
