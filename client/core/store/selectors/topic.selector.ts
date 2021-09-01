import { StoreProps } from '../store.types';

export const currentTopicSelector = (store: StoreProps) => ({
  ...store.currentTopic,
});
