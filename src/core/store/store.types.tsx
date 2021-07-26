import { SnackBarDataProps } from '@components/SnackBar';
import { LeaderboardProps, ProfileProps } from '@core/api';

export interface StoreProps {
  auth: StoreAuthProps;
  profile: ProfileProps;
  snackbar: StoreSnackBarProps;
  leaderboard: LeaderboardProps;
  oauth: OAuthProps;
}

export type StoreAuthProps = {
  isAuth: boolean
};

export type OAuthProps = {
  service_id: string;
  callbackURL: string;
  oauthURL: string
};

export interface StoreSnackBarProps extends SnackBarDataProps {
  isVisible: boolean;
}
