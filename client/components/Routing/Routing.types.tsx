import { FC } from 'react';

export type PAGES = 'game' | 'forum' | 'discussion' | 'signin' | 'signup' | 'profile' | 'leaderboard';

export type RouteType = { path: string, component: FC, name: PAGES };
