import React, { FC, memo } from 'react';
import { Paper, Typography, Box } from '@material-ui/core';
import { Avatar } from '@components/Avatar';

interface LeaderboardRowProps {
  order: number;
  username: string;
  avatar: string;
  score: number;
}

export const LeaderboardRow: FC<LeaderboardRowProps> = memo(
  ({ order, username, avatar, score }) => (
    <Paper elevation={22}>
      <Box px="45px" py="20px" display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <Typography variant="body1">{order}</Typography>
          <Box ml="35px" mr="24px"><Avatar src={avatar} radius="60" /></Box>
          <Typography variant="body1">{username}</Typography>
        </Box>
        <Typography variant="body1">{score}</Typography>
      </Box>
    </Paper>
  ),
);
