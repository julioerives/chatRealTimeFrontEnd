import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AuthServiceService } from "src/app/auth/authService/auth-service.service";
import { SpinnerService } from "src/app/services/spinner/spinner.service";
import { configAlert } from "../modalsConfig/alertConfig";
import { ModalAlertComponent } from "../modalsAlert/modal-alert/modal-alert.component";
@Injectable({
  providedIn: 'root'
})
export class ErrorShowService {
  constructor(private authService:AuthServiceService,
    private modal:MatDialog,
    private router:Router,
    private spinner:SpinnerService
){}
showError(e:any){
    const modal= this.modal.open(ModalAlertComponent,{
        data:e,
        ...configAlert
      })
      setTimeout(()=>{
        modal.close();
      },5000)
      this.spinner.noShowSpinner();
      this.authService.removeCredencial();
      this.router.navigate(['/login']);
}
}
