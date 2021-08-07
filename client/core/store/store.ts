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
import { oauthReducer } from './reducers/oauth.reducer';
import { initialStateTheme, themeReducer } from './reducers/theme.reducer';

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
  oauth: oauthReducer,
  notification: notificationReducer,
  theme: themeReducer,
});

export const defaultState = {
  snackbar: initialStateSnackBar,
  profile: {},
  leaderboard: {},
  notification: { notificationsAllowed: false },
  auth: { isAuth: false },
  oauth: { callbackURL: 'http://localhost:8000' },
  theme: initialStateTheme,
} as StoreProps;

export const composeStore = (initialState: {}) => createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middlewares),
  ),
);
