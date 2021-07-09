import { ProfileProps } from '@core/api';

export type StoreProfileProps = ProfileProps & { isAuth: boolean };

export interface StoreProps {
  user: StoreProfileProps;
}
