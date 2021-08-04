import { ProfileProps } from 'client/core/api';
import { BaseAPI } from 'client/core/api/base.api';
import { ServerHTTP } from './api';

const ServerProfileAPIInstance = new ServerHTTP('/user');

export type EditDataProfileProps = Omit<ProfileProps, 'id' | 'password' | 'avatar'>;

export class ServerProfileAPI extends BaseAPI {
  static editDataProfile(data: EditDataProfileProps) {
    return ServerProfileAPIInstance.put<EditDataProfileProps, ProfileProps>('/profile', { data });
  }

  static editAvatarProfile(data: FormData) {
    return ServerProfileAPIInstance.put<FormData, ProfileProps>('/profile/avatar', { data });
  }
}
