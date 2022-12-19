import { createReducer, on } from '@ngrx/store';

import { login, logout } from '../../actions/login/login.actions';
import { initialState } from '../../initialState/login/login.state';

const _loginReducers = createReducer(
  initialState,
  on(login, (state, { user, token, isLogin, isAdmin }) => {
    return {
      ...state,
      user,
      token,
      isLogin,
      isAdmin
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      user: {
        id: '',
        name: '',
        lastName: '',
        role: '',
        email: '',
        password: '',
      },
      token: '',
      isLogin: false,
      isAdmin: false,
    };
  })
);

export const loginReducers = (state: any, action: any) => {
  return _loginReducers(state, action);
};
