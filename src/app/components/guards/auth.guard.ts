import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor
  (
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService,
  )
  {}

  canActivate(): boolean{
    if(this.authService.isLoggedIn()){
      return true;
    }else{
      this.toast.error({detail:"ERROR", summary:"Login First!"})
      this.router.navigate(['login'])
      return false;
    }

  }


}
