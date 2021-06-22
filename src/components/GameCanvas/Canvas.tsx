import React, { memo, FC } from 'react';
import { useCanvas } from './useCanvas';

export type CanvasProps = {
  draw: GamePainter;
};

export const Canvas: FC<CanvasProps> = memo(
  ({ draw }: CanvasProps) => {
    const classes = useStyles();
    const canvasRef = useCanvas(draw);
    return <canvas ref={canvasRef} className={classes.root} />;
  },
);
