import { OAuthAPI, RespClientIdProps } from '@core/api/oauth.api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreProps } from '../store.types';
import { OAUTH } from './action.types';
// eslint-disable-next-line import/no-cycle
import { getProfileThunk } from './profile.actions';
import { showSnackBarAction } from './snackbar.actions';

export const setClietnIdAction = (payload: RespClientIdProps) => ({
  type: OAUTH.SET_ID,
  payload,
});

export const setOAuthUrlAction = (payload: { oauthURL: string }) => ({
  type: OAUTH.SET_URL,
  payload,
});

export const setCodeAction = (payload: { code: string }) => ({
  type: OAUTH.SET_CODE,
  payload,
});

export const clearCodeAction = () => ({
  type: OAUTH.CLEAR_CODE,
});

export const createOAuthURL = (id: string, url: string) => (
  `https://oauth.yandex.ru/authorize?response_type=code&client_id=${id}&redirect_uri=${url}`
);

export const getClientIdThunk = (url: string):
ThunkAction<void, StoreProps, unknown, Action<string>> => async (dispatch) => {
  try {
    const result = await OAuthAPI.getClientId({ redirect_uri: url });
    dispatch(setClietnIdAction(result));
    const oauthURL = createOAuthURL(result.service_id, url);
    dispatch(setOAuthUrlAction({ oauthURL }));
  } catch (error) {
    dispatch(showSnackBarAction({ type: 'error', msg: 'Error' }));
  }
};

export const signInWithOAuthThunk = (code: string, url: string):
ThunkAction<void, StoreProps, unknown, Action<string>> => async (dispatch) => {
  try {
    await OAuthAPI.OAuthSignin({ code, redirect_uri: url });
    dispatch(getProfileThunk());
  } catch (error) {
    dispatch(showSnackBarAction({ type: 'error', msg: 'Error' }));
  }
};
