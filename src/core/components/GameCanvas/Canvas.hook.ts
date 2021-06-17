import { useEffect, useRef } from 'react';
import { CONFIG } from './Canvas.consts';
import { GAME_RESOURCES } from './Canvas.resources';
import { Point, ResourcesLoader, ResourcesProps } from './utils';

export const useCanvas = (
    draw: Function,
) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = CONFIG.CANVAS.width;
            canvas.height = CONFIG.CANVAS.height;
        }

        const ctx = canvas?.getContext('2d');

        const controller: any[] = [[]];
        let animationFrameId: number;
        let isDraw = false;

        const getPoint = (e: MouseEvent) => {
            if (canvas) {
                const line = controller[controller.length - 1];
                const x = e.pageX - canvas?.offsetLeft;
                const y = e.pageY - canvas?.offsetTop;
                const point = new Point(x, y);
                line.push(point);
            }
        };

        const handleStartBorder = (e: MouseEvent) => {
            getPoint(e);
            isDraw = true;
        };

        const handleDrawBorder = (e: MouseEvent) => {
            if (isDraw) {
                getPoint(e);
            }
        };

        const handleEndBorder = (e: MouseEvent) => {
            getPoint(e);
            isDraw = false;
            controller.push([]);
        };

        if (canvas) {
            canvas.addEventListener('mousedown', handleStartBorder, false);
            canvas.addEventListener('mousemove', handleDrawBorder, false);
            canvas.addEventListener('mouseup', handleEndBorder, false);
        }

        const drawCanvas = (resources?: ResourcesProps) => {
            draw({ ctx, controller, resources });
            animationFrameId = window.requestAnimationFrame(() => drawCanvas(resources));
        };

        if (GAME_RESOURCES) {
            ResourcesLoader.onReady(drawCanvas);
            ResourcesLoader.load(GAME_RESOURCES);
        } else {
            drawCanvas();
        }

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            canvas?.removeEventListener('mousedown', handleStartBorder, false);
            canvas?.removeEventListener('mousemove', handleDrawBorder, false);
            canvas?.removeEventListener('mouseup', handleEndBorder, false);
        };
    }, []);

    return canvasRef;
};
