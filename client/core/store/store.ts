import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';
import { StoreProps } from './store.types';
import { initialStateSnackBar } from './reducers/snackbar.reducer';

const middlewares = [
  thunk,
];

export const defaultState = {
  snackbar: initialStateSnackBar,
  profile: {},
  leaderboard: {},
  notification: { notificationsAllowed: false },
  auth: { isAuth: false },
} as StoreProps;

export const composeStore = (initialState: StoreProps) => createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middlewares),
  ),
);
