/* eslint-disable import/no-cycle */
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { AuthAPI, ProfileProps } from '@core/api';
import { StoreProps } from '../store.types';
import { PROFILE } from './action.types';
import { logoutThunk, setAuthAction } from './auth.actions';

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
