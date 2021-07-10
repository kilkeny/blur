import { ProfileProps } from '@core/api';

export interface StoreProps {
  auth: StoreAuthProps;
  profile: ProfileProps
}

export type StoreAuthProps = {
  isAuth: boolean
};
