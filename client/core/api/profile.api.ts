import { BaseAPI } from './base.api';
import { HTTP } from './api';
import { ProfileProps } from './auth.api';

const ProfileAPIInstance = new HTTP('/user', '/api/v2');

export type EditDataProfileProps = Omit<ProfileProps, 'id' | 'password' | 'avatar'>;

export class ProfileAPI extends BaseAPI {
  static editDataProfile(data: EditDataProfileProps) {
    return ProfileAPIInstance.put<EditDataProfileProps, ProfileProps>('/profile', { data });
  }

  static editAvatarProfile(data: FormData) {
    return ProfileAPIInstance.put<FormData, ProfileProps>('/profile/avatar', { data });
  }
}
