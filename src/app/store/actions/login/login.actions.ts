import { createAction, props } from '@ngrx/store';

import { User } from 'src/app/models/user';

export enum loginActionsTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export const login = createAction(
  loginActionsTypes.LOGIN,
  props<{ user: User; token: string, isLogin: boolean, isAdmin: boolean }>()
);

export const logout = createAction(loginActionsTypes.LOGOUT);
