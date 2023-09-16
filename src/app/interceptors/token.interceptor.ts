import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private toast: NgToastService,
    private router: Router,
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.authService.getToken();

    if(myToken){
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}`} //"Bearer " + myToken"
      })
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.toast.warning({detail:"Warning", summary:"Token expired, Login again."});
            this.router.navigate(['login'])
          }
        }
        return throwError(()=> new Error("Some other error occurred"))
      })
    );

  }
}
