import { makeStyles, Theme } from '@material-ui/core';
import React, { memo, FC, useState } from 'react';
import { GamePainter } from './Canvas.draw';
import { useCanvas } from './useCanvas';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius,
  },
}));

export type CanvasProps = {
  draw: GamePainter;
  handleGameOver: Function;
};
function fib(n:number): any {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

export const Canvas: FC<CanvasProps> = memo(
  ({ draw, handleGameOver }: CanvasProps) => {
    const classes = useStyles();
    const canvasRef = useCanvas(draw, handleGameOver);
    const [state, setState] = useState(20);
    const handleSetFullScreen = () => {
      if (canvasRef?.current) {
        canvasRef.current.requestFullscreen();
      }
    };

    setInterval(() => {
      setState(state + 1);
    }, 10);

    return (
      <>
        <span style={{ position: 'absolute' }}>{fib(state)}</span>
        <canvas
          ref={canvasRef}
          className={classes.root}
          onDoubleClick={handleSetFullScreen}
        />
      </>
    );
  },
);
