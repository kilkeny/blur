import { BaseAPI } from './base.api';
import { HTTP } from './api';

export type ClientIdProps = {
  redirect_uri: string
};

export type SignInProps = { code: string } & ClientIdProps;

export type RespClientIdProps = {
  service_id: string;
};

const OAuthAPIInstance = new HTTP('/oauth');

export class OAuthAPI extends BaseAPI {
  static getClientId(data: ClientIdProps) {
    return OAuthAPIInstance.get<string, RespClientIdProps>('/yandex/service-id', { data });
  }

  static signIn(data: SignInProps) {
    return OAuthAPIInstance.post<string, RespClientIdProps>('/yandex', { data });
  }
}
