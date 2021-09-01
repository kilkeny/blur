/* eslint-disable import/no-cycle */
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { AuthAPI, SigninProps, SignupProps } from '@core/api';
import Cookies from 'js-cookie';
import { StoreProps } from '../store.types';
import { AUTH } from './action.types';
import { clearProfileAction, getProfileThunk } from './profile.actions';
import { showSnackBarAction } from './snackbar.actions';
import { clearLeaderboardAction } from './leaderboard.actions';
import { clearCodeAction } from './oauth.actions';
import { clearForumAction } from './forum.actions';

export const setAuthAction = () => ({ type: AUTH.SET });

export const clearAuthAction = () => ({ type: AUTH.CLEAR });

export const logoutThunk = (
): ThunkAction<void, StoreProps, unknown, Action<string>> => async (
  dispatch,
) => {
  dispatch(clearAuthAction());
  dispatch(clearProfileAction());
  dispatch(clearLeaderboardAction());
  dispatch(clearForumAction());
  dispatch(clearCodeAction());
  Cookies.remove('uuid'); // у вас AuthAPI.logout() отвечает с респонсом set-cookie, который экспайрит куки, то есть
  Cookies.remove('authCookie'); // в этом нет необхоидмости

  await AuthAPI.logout();
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
    if (!error.ok) { // чтобы не повторять этот код его можно вынести в HTTP сервис
      const response = await error;
      const result = await response.json();
      dispatch(showSnackBarAction({ type: 'error', msg: result.reason }));
    }
    dispatch(logoutThunk());
  }
};

export const signupThunk = (
  data: SignupProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => async (
  dispatch,
) => {
  try {
    await AuthAPI.signup(data);
    dispatch(getProfileThunk());
  } catch (error) {
    if (!error.ok) {
      const response = await error;
      const result = await response.json();
      dispatch(showSnackBarAction({ type: 'error', msg: result.reason }));
    }
    dispatch(logoutThunk());
  }
};
