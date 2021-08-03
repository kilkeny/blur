import { BaseAPI } from './base.api';
import { HTTP } from './api';

const LeaderboardAPIInstance = new HTTP('/leaderboard');

export type AddUserProps = {
  name: string;
  avatar: string | undefined;
  score: number;
};

export type GetLeaderboardProps = {
  cursor: number;
  limit: number;
  ratingFieldName: string;
};

export type LeaderboardProps = { data: AddUserProps }[];

export class LeaderboardAPI extends BaseAPI {
  static addUser(user: AddUserProps) {
    return LeaderboardAPIInstance.post('', { data: { data: user, ratingFieldName: 'score' }, responseFormat: 'text' });
  }

  static getLeaderboard() {
    const data: GetLeaderboardProps = {
      ratingFieldName: 'score',
      cursor: 0,
      limit: 10,
    };

    return LeaderboardAPIInstance.post<GetLeaderboardProps, LeaderboardProps>('/all', { data });
  }
}
