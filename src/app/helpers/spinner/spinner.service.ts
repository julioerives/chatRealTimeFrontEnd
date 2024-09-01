import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }
  showSpinner(){
    const spinner:any = document.querySelector('#cargando');
    spinner.style.display = 'flex';
  }
  noShowSpinner(){
    const spinner:any = document.querySelector('#cargando');
    spinner.style.display = 'none';
  }
}
