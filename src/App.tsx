import { Canvas, GamePainter } from '@core/components/GameCanvas';
import React, { FC, memo } from 'react';

export const App: FC = memo(() => {
    const draw = new GamePainter();
    return <Canvas draw={draw.drawCanvas} />;
});
