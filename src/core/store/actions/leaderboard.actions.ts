/* eslint-disable import/no-cycle */
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { LeaderboardProps, LeaderboardAPI, AddUserProps } from '@core/api';
import { LEADERBOARD } from './action.types';
import { showSnackBarAction } from './snackbar.actions';
import { StoreProps } from '../store.types';

export const setLeadboardAction = (payload: LeaderboardProps) => ({
  type: LEADERBOARD.SET,
  payload,
});

export const clearLeaderboardAction = () => ({
  type: LEADERBOARD.CLEAR,
});

export const getLeaderboardThunk = ():
ThunkAction<void, StoreProps, unknown, Action<string>> => async (dispatch) => {
  try {
    const data = await LeaderboardAPI.getLeaderboard();
    dispatch(setLeadboardAction(data));
  } catch (error) {
    dispatch(showSnackBarAction({ type: 'error', msg: 'Error' }));
  }
};

export const addUserToLeaderboardThunk = (data: AddUserProps):
ThunkAction<void, StoreProps, unknown, Action<string>> => async (dispatch) => {
  try {
    LeaderboardAPI.addUser(data);
  } catch (error) {
    dispatch(showSnackBarAction({ type: 'error', msg: 'Error' }));
  }
};
