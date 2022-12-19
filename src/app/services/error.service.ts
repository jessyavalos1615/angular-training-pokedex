import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { ErrorResponse } from 'src/app/models/errors';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage-tokens.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  public redirectToLogin() {
    this.router.navigateByUrl('/login');
    this.localStorage.delete(environment.jwtKey);
  }

  public handleError({ error }: ErrorResponse) {
    if (error.message === 'Invalid token.') {
      this.redirectToLogin();
    } else {
      throw new Error('Something went wrong, try again');
    }
  }
}
