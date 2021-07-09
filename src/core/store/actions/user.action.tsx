import { FormInputs } from '@components/FormInput';
import { AuthAPI } from '@core/api';
import { UserAPI } from '@core/api/user.api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { USER } from './action.types';

const authAPI = new AuthAPI();
const userAPI = new UserAPI();

export const thunkGetUser = ():
ThunkAction<void, any, unknown,
Action<string>> => async (
  dispatch,
) => {
  const payload = await authAPI.getUser();
  dispatch({ type: USER.FETCH, payload });
};

export const thunkUpdateUser = (data: FormInputs):
ThunkAction<void, any, unknown,
Action<string>> => async (
  dispatch,
) => {
  const payload = await userAPI.changeProfile(data);
  dispatch({ type: USER.UPDATE, payload });
};

export const thunkUpdateAvatar = (data: FormData):
ThunkAction<void, any, unknown,
Action<string>> => async (
  dispatch,
) => {
  const payload = await userAPI.updateAvatar(data);
  dispatch({ type: USER.LOAD_AVATAR, payload });
};
