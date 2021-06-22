import React, { FC, memo } from 'react';
import { Box } from '@material-ui/core';
import { PageHeader } from '@components/PageHeader';
import { LeaderboardRow } from '@components/LeaderboardRow';
import { leaderboardData } from './leaderboard.mock';

export const Leaderboard: FC = memo(() => (
  <>
    <PageHeader title="leaderboard" />
    <Box display="flex" flexDirection="column">
      {leaderboardData.map((user, index) => (
        <Box mb="30px" key={user.id}>
          <LeaderboardRow
            order={index + 1}
            username={user.username}
            avatar={user.avatar}
            score={user.score}
          />
        </Box>
        ))}
    </Box>
  </>
));
