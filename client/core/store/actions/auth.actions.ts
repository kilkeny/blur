/* eslint-disable import/no-cycle */
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { AuthAPI, SigninProps, SignupProps } from '@core/api';
import { StoreProps } from '../store.types';
import { AUTH } from './action.types';
import { clearProfileAction, getProfileThunk } from './profile.actions';
import { showSnackBarAction } from './snackbar.actions';
import { clearLeaderboardAction } from './leaderboard.actions';
import { clearCodeAction } from './oauth.actions';

export const setAuthAction = () => ({ type: AUTH.SET });

export const clearAuthAction = () => ({ type: AUTH.CLEAR });

export const logoutThunk = (
): ThunkAction<void, StoreProps, unknown, Action<string>> => async (
  dispatch,
) => {
  dispatch(clearAuthAction());
  dispatch(clearProfileAction());
  dispatch(clearLeaderboardAction());
  dispatch(clearCodeAction());
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
    if (!error.ok) {
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
