import { Injectable } from '@angular/core';
import { Main } from '../main';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends Main {

  constructor(private _cliente:HttpClient) { 
    super(_cliente,"user")
  }
}
