import { FormInputs } from '@components/FormInput';
import { BaseAPI } from './base.api';
import { HTTP } from './api';

const UserAPIInstance = new HTTP('/user');

export class UserAPI extends BaseAPI {
  changeProfile(data: FormInputs) {
    return UserAPIInstance.put('/profile', { data });
  }

  updateAvatar(data: FormData) {
    return UserAPIInstance.put('/profile/avatar', { data });
  }
}
