import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { FC, memo } from 'react';
import { ColorBall } from './ColorBall';

type GameStartProps = {
  handleChangeStatus: Function;
  handleChangeColor: React.MouseEventHandler<SVGSVGElement>;
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

export const GameStart: FC<GameStartProps> = memo(({ handleChangeStatus, handleChangeColor }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body1">choose color:</Typography>
      <div>
        <ColorBall variant="primary" {...{ handleChangeColor }} />
        <ColorBall variant="secondary" {...{ handleChangeColor }} />
      </div>
      <Button color="primary" onClick={handleChangeStatus('game')}>
        {'play >'}
      </Button>
      <Typography variant="body1">double click to enter fullscreen mode</Typography>
    </div>
  );
});
