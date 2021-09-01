import { SnackBarDataProps } from '@components/SnackBar';
import { LeaderboardProps, ProfileProps, ThemeProps } from '@core/api';
import { RouterState } from 'connected-react-router';

export interface StoreProps {
  router: RouterState; //missed
  auth: StoreAuthProps;
  profile: ProfileProps;
  snackbar: StoreSnackBarProps;
  leaderboard: LeaderboardProps;
  oauth: OAuthProps;
  notification: NotificationProps
  theme: ThemeProps;
  forum: ForumProps;
}

export type StoreAuthProps = {
  isAuth: boolean; // missed
};

export type OAuthProps = {
  service_id: string;
  callbackURL: string;
  oauthURL: string;
  code: string;
};

export interface StoreSnackBarProps extends SnackBarDataProps {
  isVisible: boolean;
}

export type NotificationProps = {
  notificationsAllowed: boolean;
};

export type TopicType = {
  id: number, // лучше одного стиля придерживаться. Как правило используется ";"
  title: string,
  content: string,
  author: string,
  created: string,
  comments: [],
};

export type ForumProps = TopicType[];
