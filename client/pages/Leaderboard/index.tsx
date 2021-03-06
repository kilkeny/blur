import React, { FC, memo, useMemo, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { PageHeader } from '@components/PageHeader';
import { LeaderboardRow } from '@components/LeaderboardRow';
import { useDispatch, useSelector } from 'react-redux';
import { leaderboardSelector } from '@core/store';
import { withAuth } from '@core/HOKs/withAuth';
import { LeaderboardProps } from '@core/api';
import { getLeaderboardThunk } from '@core/store/actions/leaderboard.actions';

export const WrapperLeaderboard: FC = memo(() => {
  const dispatch = useDispatch();
  const leaderboard = useSelector(leaderboardSelector);

  useEffect(() => {
    dispatch(getLeaderboardThunk());
  }, []);

  const leaderboardRows = useMemo(() => {
    const users = Object.values(leaderboard) as LeaderboardProps;
    return users.map((user, i) => {
      const { name, avatar, score } = user.data;
      return (
        <LeaderboardRow
          key={name}
          order={i + 1}
          username={name}
          avatar={avatar}
          score={score}
        />
      );
    });
  }, [leaderboard]);

  return (
    <>
      <PageHeader title="leaderboard" />
      <Box display="flex" flexDirection="column">
        {leaderboardRows}
      </Box>
    </>
  );
});

export const Leaderboard = withAuth(WrapperLeaderboard);
