import { StoreProps } from 'client/core/store';

export const defaultState = {
  snackbar: { isVisible: false, msg: '', type: 'info' },
  profile: {},
  leaderboard: {},
  notification: { notificationsAllowed: false },
  auth: { isAuth: false },
} as StoreProps;
