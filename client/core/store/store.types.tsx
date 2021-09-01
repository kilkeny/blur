import { SnackBarDataProps } from '@components/SnackBar';
import { LeaderboardProps, ProfileProps, ThemeProps } from '@core/api';
import { RouterState } from 'connected-react-router';

export interface StoreProps {
  router: RouterState;
  auth: StoreAuthProps;
  profile: ProfileProps;
  snackbar: StoreSnackBarProps;
  leaderboard: LeaderboardProps;
  oauth: OAuthProps;
  notification: NotificationProps
  theme: ThemeProps;
  forum: ForumProps;
  currentTopic: TopicType;
}

export type StoreAuthProps = {
  isAuth: boolean;
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

export type CommentType = {
  topicid: number;
  commentid: number;
  content: string;
  author: string;
  created: string;
};

export type TopicType = {
  id: number;
  title: string;
  content: string;
  author: string;
  created: string;
  comments: CommentType[];
};

export type ForumProps = TopicType[];
