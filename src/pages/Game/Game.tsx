import { Canvas, GamePainter } from '@components/index';
import { makeStyles, Paper } from '@material-ui/core';
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSizeComponents } from '@core/index';
import { GameStart } from './components';

const useStyles = makeStyles({
  root: {
    minWidth: 600,
    minHeight: 600,
    maxHeight: 1000,
    display: 'flex',
  },
});

type TypeStatusGame = 'game' | 'start' | 'finish';

export const Game: FC = memo(() => {
  const ref = useRef(null);
  const classes = useStyles();
  const size = useSizeComponents(ref);

  const [status, setStatus] = useState<TypeStatusGame>('start');

  const draw = useMemo(
    () => new GamePainter(size),
    [size, status],
  );

  const handleChangeStatus = useCallback(
    (value: TypeStatusGame) => () => setStatus(value),
    [],
  );

  useEffect(() => console.log(size), [size]);

  const controlCanvas = useMemo(() => {
    if (status === 'game' && draw) {
      return <Canvas draw={draw} key={`${draw.width}${draw.height}`} />;
    }
    return <GameStart {...{ handleChangeStatus }} />;
  }, [draw]);

  return (
    <Paper className={classes.root} ref={ref}>
      {controlCanvas}
    </Paper>
  );
});
