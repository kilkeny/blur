import { Canvas, GamePainter } from '@components/index';
import { makeStyles, Paper, useTheme } from '@material-ui/core';
import React, { FC, memo, useCallback, useMemo, useRef, useState } from 'react';
import { useSizeComponents } from '@core/index';
import { v4 as uuid } from 'uuid';
import { GameStart } from './components';
import { ColorVariant } from './components/ColorBall';

const useStyles = makeStyles({
  root: {
    maxHeight: 1000,
    minHeight: 600,
    display: 'flex',
  },
});

type TypeStatusGame = 'game' | 'start' | 'finish';

export const Game: FC = memo(() => {
  const ref = useRef(null);
  const size = useSizeComponents(ref);

  const classes = useStyles();
  const [variant, setVariant] = useState<ColorVariant>('primary');
  const theme = useTheme();

  const [status, setStatus] = useState<TypeStatusGame>('start');

  const draw = useMemo(() => new GamePainter(size, uuid(), theme.palette[variant].main), [
    size,
    status,
  ]);

  const handleChangeStatus = useCallback(
    (value: TypeStatusGame) => () => setStatus(value),
    [],
  );

  const handleChangeColor = useCallback((event) => {
    const { target } = event;
    const elem = target.closest('svg');
    setVariant(elem.id);
  }, []);

  // TODO: Это затравка на завершение игры
  const controlGame = useMemo(() => {
    if (status === 'game' && draw) {
      return <Canvas draw={draw} key={draw.id} />;
    }
    return <GameStart {...{ handleChangeStatus, handleChangeColor }} />;
  }, [draw]);

  return (
    <Paper className={classes.root} ref={ref}>
      {controlGame}
    </Paper>
  );
});
