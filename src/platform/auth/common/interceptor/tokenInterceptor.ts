import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { TokenService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.getToken())
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken().access_token}`
        }
      });
    return next.handle(request);
  } // constructor
} // class
