import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { leaderboardReducer } from './leaderboard.reducer';
import { notificationReducer } from './notification.reducer';
import { profileReducer } from './profile.reducer';
import { snackbarReducer } from './snackbar.reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  leaderboard: leaderboardReducer,
  snackbar: snackbarReducer,
  notification: notificationReducer,
});
