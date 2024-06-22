import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/authService/auth-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private authService:AuthServiceService,private router:Router){}
  cerrarSesion(){
    this.authService.removeCredencial();
    this.authService.removeChatId();
    this.router.navigate(['login'])
  }
}
