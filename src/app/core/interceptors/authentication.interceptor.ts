import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

const PROJECT_KEY = 'e209c1155738e7c287ff2add312d1e43';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestOpts = request.clone({
      params: request.params.set('key', PROJECT_KEY)
    });
    return next.handle(requestOpts);
  }
}
