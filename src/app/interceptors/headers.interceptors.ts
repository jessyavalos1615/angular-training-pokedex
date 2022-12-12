import {
  HttpRequest,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { LocalStorageService } from '../services/local-storage-tokens.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor(private localStorage: LocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      setHeaders: {
        'x-token': `${this.localStorage.get(environment.jwtKey)}`,
      },
    });
    return next.handle(newRequest);
  }
}
