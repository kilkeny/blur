import { FormInputs } from '@components/FormInput';
import { BaseAPI } from './base.api';
import { HTTP } from './api';

const AuthAPIInstance = new HTTP('/auth');

export class AuthAPI extends BaseAPI {
  signin(
    data: FormInputs,
  ) {
    return AuthAPIInstance.post('/signin', { data });
  }

  signup(
    data: FormInputs,
  ) {
    return AuthAPIInstance.post('/signup', { data });
  }

  getUser() {
    return AuthAPIInstance.get('/user');
  }
}
