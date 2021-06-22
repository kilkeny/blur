import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { FC, memo } from 'react';

type GameStartProps = {
  handleChangeStatus: Function
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    display: 'flex',
  },
});

export const GameStart: FC<GameStartProps> = memo(({ handleChangeStatus }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body1">choose color:</Typography>
      <Button color="primary" onClick={handleChangeStatus('game')}>{'play >'}</Button>
    </div>
  );
});
