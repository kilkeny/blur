import { SnackBarDataProps } from '@components/SnackBar';
import { LeaderboardProps, ProfileProps } from '@core/api';
import { RouterState } from 'connected-react-router';

export interface StoreProps {
  router: RouterState
  auth: StoreAuthProps;
  profile: ProfileProps;
  snackbar: StoreSnackBarProps;
  leaderboard: LeaderboardProps;
  notification: NotificationProps
}

export type StoreAuthProps = {
  isAuth: boolean
};
export interface StoreSnackBarProps extends SnackBarDataProps {
  isVisible: boolean;
}

export type NotificationProps = {
  notificationsAllowed: boolean;
};
