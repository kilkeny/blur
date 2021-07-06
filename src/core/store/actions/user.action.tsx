import { AuthAPI } from '@core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { USER } from './action.types';

export const thunkGetUser = ():
ThunkAction<void, any, unknown,
Action<string>> => async (
  dispatch,
) => {
  const api = new AuthAPI();
  const payload = await api.getUser();
  dispatch({ type: USER.FETCH, payload });
};
