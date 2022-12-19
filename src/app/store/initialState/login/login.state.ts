import { User } from 'src/app/models/user';

export const initialState: loginStateTypes = {
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

export interface loginStateTypes {
  user: User;
  token?: string;
  isLogin: boolean;
  isAdmin: boolean;
}
