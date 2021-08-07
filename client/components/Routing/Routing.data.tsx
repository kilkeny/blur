import { Discussion } from '@pages/Discussion';
import { Forum } from '@pages/Forum';
import { Game } from '@pages/Game';
import { Leaderboard } from '@pages/Leaderboard';
import { Login } from '@pages/Login';
import { Profile } from '@pages/Profile';
import { SignUp } from '@pages/SignUp';
import { PAGES, RouteType } from './Routing.types';

export const ROUTES: Record<PAGES, RouteType> = {
  game: {
    path: '/',
    component: Game,
    name: 'game',
  },
  forum: {
    path: '/forum',
    component: Forum,
    name: 'forum',
  },
  discussion: {
    path: '/discussion/:id',
    component: Discussion,
    name: 'discussion',
  },
  signin: {
    path: '/signin',
    component: Login,
    name: 'signin',
  },
  signup: {
    path: '/signup',
    component: SignUp,
    name: 'signup',
  },
  profile: {
    path: '/profile',
    component: Profile,
    name: 'profile',
  },
  leaderboard: {
    path: '/leaderboard',
    component: Leaderboard,
    name: 'leaderboard',
  },
};
