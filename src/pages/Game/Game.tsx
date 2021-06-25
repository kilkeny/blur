import { Canvas, GamePainter } from '@components/index';
import { makeStyles, Paper, useTheme } from '@material-ui/core';
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SizeProps, useSizeComponents } from '@core/index';
import { v4 as uuid } from 'uuid';
import { GameFinish, GameStart } from './components';
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
  const [oldSize, setOldSize] = useState<SizeProps | null>(null);

  const classes = useStyles();
  const [variant, setVariant] = useState<ColorVariant>('primary');
  const [score, setScore] = useState(0);
  const theme = useTheme();

  const [status, setStatus] = useState<TypeStatusGame>('start');
  const [draw, setDraw] = useState<GamePainter | null>(null);

  const createrDraw = () => new GamePainter(size, uuid(), theme.palette[variant].main);

  useEffect(() => {
    if (
      !oldSize
            || size.height !== oldSize?.height
            || size.width !== oldSize?.width
    ) {
      setOldSize(size);
      setDraw(createrDraw());
    }
  }, [size]);

  useEffect(() => {
    setScore(0);
    setDraw(createrDraw());
  }, [status]);

  const handleGameOver = useCallback((value: number) => {
    setScore(value);
    setStatus('finish');
  }, []);

  const handleChangeStatus = useCallback(
    (value: TypeStatusGame) => () => setStatus(value),
    [],
  );

  const handleChangeColor = useCallback((event) => {
    const { target } = event;
    const elem = target.closest('svg');
    setVariant(elem.id);
  }, []);

  const controlGame = useMemo(() => {
    if (status === 'game' && draw) {
      return <Canvas {...{ handleGameOver, draw }} key={draw.id} />;
    }
    if (status === 'finish') {
      return <GameFinish {...{ score, variant, handleChangeStatus }} />;
    }
    return <GameStart {...{ handleChangeStatus, handleChangeColor }} />;
  }, [draw, status]);

  return (
    <Paper className={classes.root} ref={ref}>
      {controlGame}
    </Paper>
  );
});
