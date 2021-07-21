import { LeaderboardProps } from '@core/api';
import { ActionProps, LEADERBOARD } from '../actions';

const initialState = {} as LeaderboardProps;

export const leaderboardReducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
  case LEADERBOARD.SET:
    return { ...state, ...action.payload };
  case LEADERBOARD.CLEAR:
    return initialState;
  default:
    return state;
  }
};
