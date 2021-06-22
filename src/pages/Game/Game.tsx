import { Canvas, GamePainter } from '@components/index';
import { Button, Paper } from '@material-ui/core';
import React, { FC, memo, useMemo, useRef, useState } from 'react';
import { useSizeComponents } from '@core/index';

export const Game: FC = memo(() => {
  // TODO: Тестовый компонент для проверки работы механизма завершения игры
  const [time, setTime] = useState<null | number>(null);
  const ref = useRef(null);

  const size = useSizeComponents(ref);

  const [attempt, setAttempt] = useState(0);

  const handleGameOver = () => {
    setTime(null);
  };

  const handleRetry = () => {
    setAttempt(attempt + 1);
    setTime(null);
  };

  const draw = useMemo(() => {
    if (size[0] && size[1] && size[1] <= 1000) {
      console.log(size);
      return new GamePainter({ width: size[0], height: size[1] });
    }
    return null;
  }, [size, time]);

  const controlCanvas = useMemo(() => {
    if (draw && time === null) {
      return (
        <Canvas
          {...{ handleGameOver, draw }}
          key={`${draw.width}${draw.height}`}
        />
      );
    }
    return (
      <div>
        <h1>{`Your time: ${((time || 1) / 1000).toFixed(2)} (sec)`}</h1>
        <Button onClick={handleRetry}>{'play again >'}</Button>
      </div>
    );
  }, [time, draw]);

  return (
    <Paper style={{ minWidth: 600, minHeight: 600, maxHeight: 1000 }} ref={ref}>
      {controlCanvas}
    </Paper>
  );
});
