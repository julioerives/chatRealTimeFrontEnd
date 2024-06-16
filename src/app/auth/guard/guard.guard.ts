import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../authService/auth-service.service';

export const guardGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthServiceService);
  const router = inject(Router)
  console.log('Hola' )
  if(auth.getCredencial()){
    return true;
  }
  router.navigate(["login"]);
  return false;
};
