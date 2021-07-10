/* eslint-disable import/no-cycle */
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { AuthAPI, SigninProps } from '@core/api';
import { StoreProps } from '../store.types';
import { AUTH } from './action.types';
import { clearProfileAction, getProfileThunk } from './profile.actions';

export const setAuthAction = () => ({ type: AUTH.SET });

export const clearAuthAction = () => ({ type: AUTH.CLEAR });

export const logoutThunk = (
): ThunkAction<void, StoreProps, unknown, Action<string>> => async (
  dispatch,
) => {
  await AuthAPI.logout();
  dispatch(clearAuthAction());
  dispatch(clearProfileAction());
};

export const signinThunk = (
  data: SigninProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => async (
  dispatch,
) => {
  try {
    await AuthAPI.signin(data);
    dispatch(getProfileThunk());
  } catch (error) {
    if (!error.ok) {
      const response = await error;
      const text = await response.json();
      if (text.reason === 'User already in system') {
        console.log(text);
      }
    }
    dispatch(logoutThunk());
  }
};
