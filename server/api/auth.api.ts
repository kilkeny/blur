import { ProfileProps, RespSigninProps, SigninProps, SignupProps } from 'client/core/api';
import { OptionsWithoutMethodType } from 'client/core/api/api';
import { BaseAPI } from 'client/core/api/base.api';
import { ServerHTTP } from './api';

const ServerAuthAPIInstance = new ServerHTTP('/auth');

export class ServerAuthAPI extends BaseAPI {
  static signin(data: SigninProps) {
    return ServerAuthAPIInstance.post<SigninProps, string>('/signin', { data, responseFormat: 'text' });
  }

  static signup(data: SignupProps) {
    return ServerAuthAPIInstance.post<SignupProps, RespSigninProps>('/signup', { data });
  }

  static logout() {
    return ServerAuthAPIInstance.post('/logout', { responseFormat: 'text' });
  }

  static profile(options: OptionsWithoutMethodType) {
    return ServerAuthAPIInstance.get<null, ProfileProps>('/user', { ...options });
  }
}
