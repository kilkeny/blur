import { FC } from 'react';

export type RouteType = {
  name: keyof RoutesType,
  path: string,
  component: FC,
};

export interface RoutesType {
  game: RouteType,
  forum: RouteType,
  discussion: RouteType,
  signin: RouteType,
  signup: RouteType,
  profile: RouteType,
  leaderboard: RouteType
}
