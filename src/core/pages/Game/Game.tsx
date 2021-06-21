import { Canvas, GamePainter } from '@core/components';
import { Button } from '@material-ui/core';
import React, { FC, memo, useMemo, useState } from 'react';

export const StartGame: FC = memo(() => {
    // TODO: Тестовый компонент для проверки работы механизма завершения игры
    const [time, setTime] = useState<null | number>(null);

    const [attempt, setAttempt] = useState(0);

    const handleGameOver = (live: number) => {
        setTime(live);
    };

    const draw = useMemo(() => new GamePainter(), [attempt]);

    const handleRetry = () => {
        setAttempt(attempt + 1);
        setTime(null);
    };

    const controlCanvas = useMemo(() => {
        if (time === null) {
            return (
              <Canvas
                draw={draw.drawCanvas}
                handleGameOver={handleGameOver}
              />
            );
        }
        return (
          <div>
            <h1>{`Your time: ${(time / 1000).toFixed(2)} (sec)`}</h1>
            <Button onClick={handleRetry}>{'play again >'}</Button>
          </div>
        );
    }, [time]);
    return controlCanvas;
});
