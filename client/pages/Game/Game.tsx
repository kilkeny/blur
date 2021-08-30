import { Canvas } from '@components/GameCanvas';
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
import { SizeProps, useSizeComponents } from '@core/index';
import { withAuth } from '@core/HOKs/withAuth';
import { useDispatch, useSelector } from 'react-redux';
import { profileSelector } from '@core/store';
import { addUserToLeaderboardThunk } from '@core/store/actions/leaderboard.actions';
import { isServer } from 'client/core/store';
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

export const WrapperGame: FC = memo(() => {
  const ref = useRef(null);
  const size = useSizeComponents(ref);
  const [oldSize, setOldSize] = useState<SizeProps>({ width: 400, height: 400 });

  const classes = useStyles();
  const [variant, setVariant] = useState<ColorVariant>('primary');
  const [score, setScore] = useState(0);

  const [status, setStatus] = useState<TypeStatusGame>('start');

  const dispatch = useDispatch();
  const { login, avatar } = useSelector(profileSelector);

  useEffect(() => {
    if (
      !oldSize
            || size.height !== oldSize?.height
            || size.width !== oldSize?.width
    ) {
      setOldSize(size);
    }
  }, [size]);

  useEffect(() => {
    if (status !== 'finish') {
      setScore(0);
    }
  }, [status, variant]);

  useEffect(() => {
    if (status === 'finish' && score > 0) {
      const data = { name: login, avatar, score };
      dispatch(addUserToLeaderboardThunk(data));
    }
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
    if (status === 'game') {
      return <Canvas {...{ handleGameOver, variant }} size={oldSize} id={uuid()} />;
    }
    if (status === 'finish') {
      return <GameFinish {...{ score, variant, handleChangeStatus }} />;
    }
    return <GameStart {...{ handleChangeStatus, handleChangeColor }} />;
  }, [status, score, size]);

  return (
    <Paper className={classes.root} ref={ref}>
      {controlGame}
    </Paper>
  );
});

const NullFC: FC = () => <></>;

export const Game = withAuth(!isServer ? WrapperGame : NullFC);
