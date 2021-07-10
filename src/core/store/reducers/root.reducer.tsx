import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { profileReducer } from './profile.reducer';
import { snackbarReducer } from './snackbar.reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  snackbar: snackbarReducer,
});
