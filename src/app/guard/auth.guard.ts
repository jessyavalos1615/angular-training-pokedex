import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { loginStateTypes } from '../store/initialState/login/login.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  token: string = '';

  constructor(
    private router: Router,
    private store: Store<{ loginState: loginStateTypes }>
  ) {
    this.store.select('loginState').subscribe((state) => {
      this.token = state.token!;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.token !== '') {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

    return false;
  }
}
