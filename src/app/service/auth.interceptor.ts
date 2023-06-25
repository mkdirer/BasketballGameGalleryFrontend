import { TokenService } from './main_service/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newRequest = request;
    const token = this.token.getToken();
    if (token != null) {
      newRequest = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(newRequest);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
