import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../models/user';
import { UsersService } from './users.service';
import { ErrorService } from './error.service';
import { LoginResponse } from '../models/login';
import { ErrorResponse } from '../models/errors';
import { environment } from 'src/environments/environment';
import { login } from '../store/actions/login/login.actions';
import { loginStateTypes } from '../store/initialState/login/login.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: User | undefined;
  private path = `${environment.loginUrl}api/auth`;

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private userService: UsersService,
    private errorHandler: ErrorService,
    private store: Store<{ loginState: loginStateTypes }>
  ) {}

  async login(email: string, password: string) {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    try {
      const { token, user } = (await firstValueFrom(
        this.http.post(this.path, { email, password })
      )) as LoginResponse;
      this.store.dispatch(
        login({ user, token, isLogin: true, isAdmin: user.role === 'ADMIN' })
      );
      this.router.navigateByUrl(returnUrl);
    } catch (err) {
      this.errorHandler.handleError(err as ErrorResponse);
    }
  }

  async register(user: User) {
    try {
      const { token } = await this.userService.createUser(user);
      user = { ...user, password: '' };
      this.store.dispatch(
        login({ user, token, isLogin: true, isAdmin: user.role === 'ADMIN' })
      );
      this.router.navigateByUrl('pokemons');
    } catch (err) {
      this.errorHandler.handleError(err as ErrorResponse);
    }
  }
}
