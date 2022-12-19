import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
} from '@angular/common/http';

import { loginStateTypes } from '../store/initialState/login/login.state';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  token: string = '';

  constructor(private store: Store<{ loginState: loginStateTypes }>) {
    this.store.select('loginState').subscribe((state) => {
      this.token = state.token!;
    });
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      setHeaders: {
        'x-token': this.token,
      },
    });
    return next.handle(newRequest);
  }
}
