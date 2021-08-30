import { StoreProps } from '../store.types';

export const forumSelector = (store: StoreProps) => ([
  ...store.forum,
]);
