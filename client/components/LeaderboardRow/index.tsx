import React, { FC, memo } from 'react';
import { Paper, Typography, makeStyles, Box } from '@material-ui/core';
import { Avatar } from '@components/Avatar';
import { BASE_URL } from '@core/api/api.consts';

interface LeaderboardRowProps {
  order: number;
  username: string;
  avatar?: string;
  score: number;
}

const useStyles = makeStyles({
  layout: {
    padding: '20px 45px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    margin: ' 0 24px 0 35px',
    width: '60px',
    height: '60px',
  },
});

export const LeaderboardRow: FC<LeaderboardRowProps> = memo(
  ({ order, username, avatar, score }) => {
    const classes = useStyles();
    return (
      <Box mb="30px">
        <Paper elevation={22}>
          <div className={classes.layout}>
            <div className={classes.left}>
              <Typography variant="body1">{order}</Typography>
              <Avatar src={avatar ? `${BASE_URL}/resources${avatar}` : undefined} className={classes.avatar} />
              <Typography variant="body1">{username}</Typography>
            </div>
            <Typography variant="body1">{score}</Typography>
          </div>
        </Paper>
      </Box>
    );
  },
);
