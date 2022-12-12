import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { firstValueFrom, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User } from '../models/user';
import { UsersService } from './users.service';
import { ErrorService } from './error.service';
import { ErrorResponse } from '../models/errors';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage-tokens.service';
import { LoginResponse } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: User | undefined;
  private path = `${environment.loginUrl}api/auth`;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private errorHandler: ErrorService,
    private userService: UsersService
  ) {
    if (this.isLoggedIn()) {
      this.user = this.decodeToken(this.localStorage.getToken() ?? '');
    }
  }

  isLoggedIn() {
    return !!this.localStorage.getToken();
  }

  logout() {
    this.localStorage.delete(environment.jwtKey);
    this.router.navigateByUrl('/login');
  }

  checkAdmin(): boolean {
    return this.user?.role === 'ADMIN';
  }

  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  async login(email: string, password: string) {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    try {
      const { token, user } = (await firstValueFrom(
        this.http.post(this.path, { email, password })
      )) as LoginResponse;
      this.localStorage.add(environment.jwtKey, token);
      this.user = user;
      this.router.navigateByUrl(returnUrl);
    } catch (err) {
      this.errorHandler.handleError(err as ErrorResponse);
    }
  }

  async register(user: User) {
    try {
      const { token } = await this.userService.createUser(user);
      this.localStorage.add(environment.jwtKey, token);
      this.user = { ...user, password: '' };
      this.router.navigateByUrl('pokemons');
    } catch (err) {
      this.errorHandler.handleError(err as ErrorResponse);
    }
  }
}
