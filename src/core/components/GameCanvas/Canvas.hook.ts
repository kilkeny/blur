import { useEffect, useRef } from 'react';
import { CONFIG } from './Canvas.consts';
import { GAME_RESOURCES } from './Canvas.resources';
import { Point, ResourcesLoader, ResourcesProps } from './utils';
// import { GAME_RESOURCES } from './Canvas.resources';
// import { ControlProps, CONTROL_KEY } from './Canvas.type';
// import { ResourcesLoader, ResourcesProps } from './utils';

export const useCanvas = (
    draw: Function,
    // handleGameOver: Function,
    // handleNextLevel: Function,
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
        const handleHeroAction = (e: KeyboardEvent) => {
            // const keyState = e.type === 'keydown';
            // eslint-disable-next-line default-case
            if (e.key === 'Escape') {
                controller.push([]);
            }
            // switch (e.keyCode) {
            //     case CONTROL_KEY.up:
            //         controller.up = keyState;
            //         break;
            //     case CONTROL_KEY.left:
            //         controller.left = keyState;
            //         break;
            //     case CONTROL_KEY.right:
            //         controller.right = keyState;
            //         break;
            // }
        };

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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            // console.log(controller);
        };

        document.addEventListener('keydown', handleHeroAction, false);
        // document.addEventListener('keyup', handleHeroAction, false);
        if (canvas) {
            canvas.addEventListener('mousedown', handleStartBorder, false);
            canvas.addEventListener('mousemove', handleDrawBorder, false);
            canvas.addEventListener('mouseup', handleEndBorder, false);
        }

        const drawCanvas = (resources?: ResourcesProps) => {
            draw(
                { ctx, controller, resources },
                // handleGameOver,
                // handleNextLevel,
                // level,
            );
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
            // document.addEventListener('keyup', handleHeroAction, false);
        };
    }, []);

    return canvasRef;
};
