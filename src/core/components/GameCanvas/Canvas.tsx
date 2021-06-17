import React, { memo, FC } from 'react';
import { useCanvas } from './Canvas.hook';

export type CanvasProps = {
    draw: Function;
};

export const Canvas: FC<CanvasProps> = memo(({ draw }: CanvasProps) => {
    const canvasRef = useCanvas(draw);
    return <canvas ref={canvasRef} />;
});
