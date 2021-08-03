import { BaseAPI } from './base.api';
import { HTTP } from './api';

const AuthAPIInstance = new HTTP('/auth');

export type SigninProps = {
  login: string;
  password: string;
};

export type SignupProps = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar?: string;
};

export type RespSigninProps = {
  id: number;
};

export type ProfileProps = SignupProps & RespSigninProps;

export class AuthAPI extends BaseAPI {
  static signin(data: SigninProps) {
    return AuthAPIInstance.post<SigninProps, string>('/signin', { data, responseFormat: 'text' });
  }

  static signup(data: SignupProps) {
    return AuthAPIInstance.post<SignupProps, RespSigninProps>('/signup', { data });
  }

  static logout() {
    return AuthAPIInstance.post('/logout', { responseFormat: 'text' });
  }

  static profile() {
    return AuthAPIInstance.get<null, ProfileProps>('/user', {});
  }
}
