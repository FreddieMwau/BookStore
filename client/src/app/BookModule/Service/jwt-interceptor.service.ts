import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/AuthModule/Service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken() || ''
    const tokenizedRequest = req.clone({headers: req.headers.set('token', token)})
    // after this implement a pipe to catch error
    return next.handle(tokenizedRequest).pipe(
      catchError(err => {
        // use this to handle errors on login 
        // you can display an error message of invalid token / if your implementing refresh token, refresh the token on error
        const error = err.error.message || "Failed. Try again later ";
        return throwError(error)
      })
    )
  }
}
