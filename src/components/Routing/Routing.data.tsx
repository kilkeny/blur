import { Canvas } from '@components/GameCanvas';
import { Discussion } from '@pages/Discussion';
import { Forum } from '@pages/Forum';
import { Login } from '@pages/Login';
import { SignUp } from '@pages/SignUp';
import { FC } from 'react';
import { RoutesType, PathEnum } from './Routing.types';

export const ROUTES: RoutesType = {
  forum: {
    path: PathEnum.FORUM,
    hasHeader: true,
    component: Forum,
    name: 'forum',
  },
  discussion: {
    path: PathEnum.DISCUSSION,
    hasHeader: true,
    component: Discussion,
    name: 'discussion',
  },
  login: {
    path: PathEnum.LOGIN,
    hasHeader: true,
    component: Login,
    name: 'login',
  },
  'sign up': {
    path: PathEnum.SIGN_UP,
    hasHeader: true,
    component: SignUp,
    name: 'sign up',
  },
  blur: {
    path: PathEnum.GAME,
    hasHeader: false,
    component: Canvas as FC,
    name: 'blur',
  },
  // profile: {
  //   path: PathEnum.SIGN_UP,
  //   hasHeader: true,
  //   component: Profile,
  //   name: 'profile',
  // },
  // leaderboard: {
  //   path: PathEnum.LEADERBOARD,
  //   hasHeader: true,
  //   component: Leaderboard,
  //   name: 'leaderboard',
  // },
};
