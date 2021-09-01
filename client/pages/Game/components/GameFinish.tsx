import { Button, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { FC, memo } from 'react';
import { ColorBall, ColorVariant } from './ColorBall';

type GameFinishProps = {
  score: number;
  handleChangeStatus: Function;
  variant: ColorVariant;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      '& > div': {
        margin: theme.spacing(2),
        '& > button': {
          marginTop: theme.spacing(2),
        },
      },
    },
  },
}));

export const GameFinish: FC<GameFinishProps> = memo(
  ({ score, variant, handleChangeStatus }) => {
    const classes = useStyles();
    const title = score === 0 ? 'Game over' : `your score is ${score}`;

    return (
      <div className={classes.root}>
        <div>
          <ColorBall variant={variant} />
          <div>
            <Typography variant="body1" align="center">{title}</Typography>
            <Button
              color="primary"
              onClick={handleChangeStatus('game')}
            >
              {'play again >'} // как вариант можно использовать html-код символов, они легко гуглятся -x &gt; это '>'
            </Button>
          </div>
        </div>
      </div>
    );
  },
);
