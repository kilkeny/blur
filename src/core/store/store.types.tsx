import { SnackBarDataProps } from '@components/SnackBar';
import { ProfileProps } from '@core/api';

export interface StoreProps {
  auth: StoreAuthProps;
  profile: ProfileProps;
  snackbar: StoreSnackBarProps
}

export type StoreAuthProps = {
  isAuth: boolean
};
export interface StoreSnackBarProps extends SnackBarDataProps {
  isVisible: boolean;
}
