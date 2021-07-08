import { FormInputs } from '@components/FormInput';
import { BaseAPI } from './base.api';
import { HTTP } from './api';

const AuthAPIInstance = new HTTP('/auth');

export type ProfileProps = {
  first_name: string;
  second_name: string;
  display_name?: string;
  avatar?: string;
  login: string;
  email: string;
  phone: string;
  id: number;
  password: string;
};

export class AuthAPI extends BaseAPI {
  signin(data: FormInputs) {
    return AuthAPIInstance.post('/signin', { data });
  }

  signup(data: FormInputs) {
    return AuthAPIInstance.post('/signup', { data });
  }

  getUser(): Promise<ProfileProps> {
    return AuthAPIInstance.get('/user');
  }
}
