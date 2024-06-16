import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { login } from 'src/app/models/auth/login';
import { Contexto } from 'src/app/services/contexto';
import { Router } from '@angular/router';
import { AuthServiceService } from '../authService/auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form=this._form.group({
    correo: new FormControl("",[Validators.required,Validators.email]),
    contraseña: new FormControl("",[Validators.required])
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
    console.log("Hola")
    if(!this.form.valid){
      return;
    }
    const data = this.form.value as login;
    this.subscription.add(
      this.ctx.loginUser().login(data).subscribe({
        next: (e) => {
          if(e.error){
            alert(e.message);
            return
          }
          console.log(e.message);
          this.authService.setCredencial(e.data)
          this.router.navigate(["dashboard"]);
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      })
    )
  }
}
