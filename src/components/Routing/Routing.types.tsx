import { FC } from 'react';

export enum PathEnum {
  FORUM = '/forum',
  DISCUSSION = '/discussion',
  LOGIN = '/login',
  SIGN_UP = '/signup',
  GAME = '/',
  PROFILE = '/profile',
  LEADERBOARD = '/leaderboard',
}

export interface RoutesType {
  forum: RouteType,
  discussion: RouteType,
  login: RouteType,
  'sign up': RouteType,
  blur: RouteType,
  profile: RouteType,
  leaderboard: RouteType
}

export type RouteName = keyof RoutesType;

export type LinkType = { name: RouteName; path: PathEnum; };

export type RouteType = LinkType & {
  hasHeader: boolean,
  component: FC,
};
