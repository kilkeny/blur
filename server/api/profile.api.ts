import { EditDataProfileProps } from 'client/core/api';
import { OptionsWithoutMethodType } from 'client/core/api/api';
import { BaseAPI } from 'client/core/api/base.api';
import { ServerHTTP } from './api';

const ServerProfileAPIInstance = new ServerHTTP('/user');

export class ServerProfileAPI extends BaseAPI {
  static editDataProfile(data: EditDataProfileProps, options: OptionsWithoutMethodType) {
    return ServerProfileAPIInstance.put<EditDataProfileProps, Promise<Response>>('/profile', { data, ...options });
  }
}
