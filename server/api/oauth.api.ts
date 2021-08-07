import { BaseAPI } from 'client/core/api/base.api';
import { ClientIdProps, SignInProps } from 'client/core/api/oauth.api';
import { ServerHTTP } from './api';

const OAuthAPIInstance = new ServerHTTP('/oauth/yandex');

export class ServerOAuthAPI extends BaseAPI {
  static OAuthGetClientId(data: ClientIdProps) {
    return OAuthAPIInstance.get<string, any>('/service-id', { data });
  }

  static OAuthSignin(data: SignInProps) {
    return OAuthAPIInstance.post<string, any>('/', { data });
  }
}
