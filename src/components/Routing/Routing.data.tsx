import { Discussion } from '@pages/Discussion';
import { Forum } from '@pages/Forum';
import { Game } from '@pages/Game';
import { Leaderboard } from '@pages/Leaderboard';
import { Login } from '@pages/Login';
import { SignUp } from '@pages/SignUp';
import { UserPage } from '@pages/UserPage';
import { RoutesType } from './Routing.types';

export const ROUTES: RoutesType = {
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
    path: '/discussion',
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
    component: UserPage,
    name: 'profile',
  },
  leaderboard: {
    path: '/leaderboard',
    component: Leaderboard,
    name: 'leaderboard',
  },
};
