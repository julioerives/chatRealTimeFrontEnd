import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-alert-confirm',
  templateUrl: './modal-alert-confirm.component.html',
  styleUrls: ['./modal-alert-confirm.component.scss']
})
export class ModalAlertConfirmComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any){}
}
