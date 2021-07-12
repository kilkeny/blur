/* eslint-disable import/no-cycle */
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { AuthAPI, EditDataProfileProps, ProfileAPI, ProfileProps } from '@core/api';
import { StoreProps } from '../store.types';
import { PROFILE } from './action.types';
import { logoutThunk, setAuthAction } from './auth.actions';
import { showSnackBarAction } from './snackbar.actions';

export const clearProfileAction = () => ({
  type: PROFILE.CLEAR,
});

const setProfileAction = (payload: ProfileProps) => ({
  type: PROFILE.SET,
  payload,
});

export const getProfileThunk = (
): ThunkAction<void, StoreProps, unknown, Action<string>> => async (dispatch) => {
  try {
    const data = await AuthAPI.profile();
    dispatch(setProfileAction(data));
    dispatch(setAuthAction());
  } catch (error) {
    dispatch(logoutThunk());
  }
};

export const editDataProfileThunk = (
  data: EditDataProfileProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => async (dispatch) => {
  try {
    const result = await ProfileAPI.editDataProfile(data);
    dispatch(setProfileAction(result));
    dispatch(showSnackBarAction({ type: 'success', msg: 'Your personal data is changed' }));
  } catch (error) {
    dispatch(showSnackBarAction({ type: 'error', msg: 'Error' }));
  }
};

export const editAvatarProfileThunk = (
  data: FormData,
): ThunkAction<void, StoreProps, unknown, Action<string>> => async (dispatch) => {
  try {
    const result = await ProfileAPI.editAvatarProfile(data);
    dispatch(setProfileAction(result));
    dispatch(showSnackBarAction({ type: 'success', msg: 'Your avatar is changed' }));
  } catch (error) {
    dispatch(showSnackBarAction({ type: 'error', msg: 'Error' }));
  }
};
