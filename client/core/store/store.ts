import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { StoreProps } from './store.types';
import { initialStateSnackBar, snackbarReducer } from './reducers/snackbar.reducer';
import { authReducer } from './reducers/auth.reducer';
import { profileReducer } from './reducers/profile.reducer';
import { leaderboardReducer } from './reducers/leaderboard.reducer';
import { notificationReducer } from './reducers/notification.reducer';

export const isServer = !(
  typeof window !== 'undefined'
  && window.document
  && window.document.createElement
);

export const history = !isServer
  ? createBrowserHistory()
  : createMemoryHistory();

const middlewares = [
  thunk,
  routerMiddleware(history),
];

const historyReducer = connectRouter(history);

export const rootReducer = combineReducers({
  router: historyReducer,
  auth: authReducer,
  profile: profileReducer,
  leaderboard: leaderboardReducer,
  snackbar: snackbarReducer,
  notification: notificationReducer,
});

export const defaultState = {
  snackbar: initialStateSnackBar,
  profile: {},
  leaderboard: {},
  notification: { notificationsAllowed: false },
  auth: { isAuth: false },
} as StoreProps;

export const composeStore = (initialState: {}) => createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middlewares),
  ),
);
