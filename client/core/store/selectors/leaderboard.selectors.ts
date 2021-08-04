import { StoreProps } from '../store.types';

export const leaderboardSelector = (store: StoreProps) => ({
  ...store.leaderboard,
});
