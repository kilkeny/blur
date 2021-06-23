import { Discussion } from '@pages/Discussion';
import { Forum } from '@pages/Forum';
import { Login } from '@pages/Login';
import { SignUp } from '@pages/SignUp';
import { RoutesType } from './Routing.types';

export const ROUTES: RoutesType = {
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
    component: Forum,
    name: 'profile',
  },
  leaderboard: {
    path: '/leaderboard',
    component: Forum,
    name: 'leaderboard',
  },
};
