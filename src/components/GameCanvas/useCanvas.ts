import { useEffect, useRef } from 'react';
import { GamePainter } from './Canvas.draw';
import { GAME_RESOURCES } from './resources';
import { Point, ResourcesLoader, ResourcesProps } from './utils';

export const useCanvas = (draw: GamePainter) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = draw.size.width;
      canvas.height = draw.size.height;
    }

    const ctx = canvas?.getContext('2d');

    const controller: Point[][] = [];
    let animationFrameId: number;
    let isDraw = false;

    const getPoint = (e: MouseEvent) => {
      if (canvas) {
        if (!controller.length) {
          controller.push([]);
        }
        const line = controller[controller.length - 1];
        const x = e.pageX - canvas?.offsetLeft;
        const y = e.pageY - canvas?.offsetTop;
        const point = new Point(x, y);
        line.push(point);
      }
    };

    const handleStartBarrier = (e: MouseEvent) => {
      getPoint(e);
      isDraw = true;
    };

    const handleDrawBarrier = (e: MouseEvent) => {
      if (isDraw) {
        getPoint(e);
      }
    };

    const handleEndBarrier = (e: MouseEvent) => {
      getPoint(e);
      isDraw = false;
      controller.push([]);
    };

    if (canvas) {
      canvas.addEventListener('mousedown', handleStartBarrier, false);
      canvas.addEventListener('mousemove', handleDrawBarrier, false);
      canvas.addEventListener('mouseup', handleEndBarrier, false);
    }

    const drawCanvas = (resources?: ResourcesProps) => {
      if (ctx) {
        draw.drawCanvas({ ctx, controller, resources });
        animationFrameId = window.requestAnimationFrame(() => drawCanvas(resources));
      }
    };

    if (GAME_RESOURCES) {
      ResourcesLoader.onReady(drawCanvas);
      ResourcesLoader.load(GAME_RESOURCES);
    } else {
      drawCanvas();
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      canvas?.removeEventListener('mousedown', handleStartBarrier, false);
      canvas?.removeEventListener('mousemove', handleDrawBarrier, false);
      canvas?.removeEventListener('mouseup', handleEndBarrier, false);
    };
  }, []);

  return canvasRef;
};
