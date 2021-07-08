import { StoreProps } from '../store.types';

export const userSelector = (store: StoreProps) => ({
  ...store.user,
});
