import { StoreProps } from '../store.types';

export const profileSelector = (store: StoreProps) => ({
  ...store.profile,
});
