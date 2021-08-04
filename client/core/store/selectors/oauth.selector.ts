import { StoreProps } from '../store.types';

export const oauthSelector = (store: StoreProps) => ({
  ...store.oauth,
});
