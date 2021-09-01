import { SigninProps, SignupProps } from 'client/core/api'; // Обычно в монорепе общие типы, модели, интерфейсы, классы выносят в папку common
import { OptionsWithoutMethodType } from 'client/core/api/api';
import { BaseAPI } from 'client/core/api/base.api';
import { ServerHTTP } from './api';

const ServerAuthAPIInstance = new ServerHTTP('/auth');

export class ServerAuthAPI extends BaseAPI {
  static signin(data: SigninProps) {
    return ServerAuthAPIInstance.post<SigninProps, any>('/signin', { data, responseFormat: 'text' });
  }

  static signup(data: SignupProps) {
    return ServerAuthAPIInstance.post<SignupProps, any>('/signup', { data });
  }

  static logout(options: OptionsWithoutMethodType) {
    return ServerAuthAPIInstance.post<null, any>('/logout', { responseFormat: 'text', ...options });
  }

  static profile(options: OptionsWithoutMethodType) {
    return ServerAuthAPIInstance.get<null, any>('/user', { ...options });
  }
}
