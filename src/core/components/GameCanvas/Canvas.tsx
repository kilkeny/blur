import React, { memo, FC } from 'react';
import { useCanvas } from './useCanvas';

export type CanvasProps = {
    draw: Function;
    handleGameOver: Function;
};

export const Canvas: FC<CanvasProps> = memo(
    ({ draw, handleGameOver }: CanvasProps) => {
        const canvasRef = useCanvas(draw, handleGameOver);
        return <canvas ref={canvasRef} />;
    },
);
