import React, { memo, FC, useRef, useEffect } from 'react';
import { GamePainter } from './Canvas.draw';

export type CanvasProps = {
  draw: GamePainter;
  handleGameOver: Function;
};

export const Canvas: FC<CanvasProps> = memo(
  ({ draw, handleGameOver }: CanvasProps) => {
    const ref = useRef<HTMLCanvasElement>(null);
    console.log(handleGameOver, draw);
    const newWorker = new Worker(
      new URL('worker.ts', import.meta.url),
    );

    const setCanvav = async () => {
      if (ref?.current) {
        const canvas = ref.current;

        // const classInstance = await instance;
        const offset = canvas.transferControlToOffscreen();
        newWorker.postMessage({ canvas: offset }, [offset]);
        newWorker.postMessage({ event: 'createPointer', color: 'red' });

        // transfer(offset, [offset]);
        // console.log(classInstance);
      }
    };

    useEffect(() => {
      setCanvav();
    }, [ref.current]);

    const handleStop = () => newWorker.postMessage({ event: 'stop' });

    const handleStart = () => newWorker.postMessage({ event: 'start' });

    return (
      <div>
        <button type="button" onClick={handleStart}>
          Start
        </button>
        <button type="button" onClick={handleStop}>
          Stop
        </button>

        <canvas ref={ref} width={1440} height={1024} />
      </div>
    );
  },
);
