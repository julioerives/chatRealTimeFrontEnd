import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Main } from '../main';
import { login } from 'src/app/models/auth/login';
import { Response } from 'src/app/models/response';

export class LoginService extends Main<login> {

  constructor(private _cliente:HttpClient) { 
    super(_cliente,"user")
  }
  login(login:login):Observable<Response<login>> {
    return this._cliente.post<Response<login>>(this.url+"/login", login);
  }
}
