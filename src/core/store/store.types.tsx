import { SnackBarDataProps } from '@components/SnackBar';
import { LeaderboardProps, ProfileProps } from '@core/api';

export interface StoreProps {
  auth: StoreAuthProps;
  profile: ProfileProps;
  snackbar: StoreSnackBarProps;
  leaderboard: LeaderboardProps;
}

export type StoreAuthProps = {
  isAuth: boolean
};
export interface StoreSnackBarProps extends SnackBarDataProps {
  isVisible: boolean;
}
