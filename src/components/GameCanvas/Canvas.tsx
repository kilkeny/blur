import { makeStyles, Theme } from '@material-ui/core';
import React, { memo, FC } from 'react';
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

export const Canvas: FC<CanvasProps> = memo(
  ({ draw, handleGameOver }: CanvasProps) => {
    const classes = useStyles();
    const canvasRef = useCanvas(draw, handleGameOver);

    const handleSetFullScreen = () => {
      if (canvasRef?.current) {
        canvasRef.current.requestFullscreen();
      }
    };

    return (
      <canvas
        ref={canvasRef}
        className={classes.root}
        onDoubleClick={handleSetFullScreen}
      />
    );
  },
);
