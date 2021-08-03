import { StoreProps } from '../store.types';

export const authSelector = (store: StoreProps) => ({
  ...store.auth,
});
