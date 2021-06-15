import { useEffect, useRef } from 'react';
import { CONFIG } from './Canvas.consts';
import { GAME_RESOURCES } from './Canvas.resources';
import { ResourcesLoader, ResourcesProps } from './utils';
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

        const controller = {};
        let animationFrameId: number;

        // const handleHeroAction = (e: KeyboardEvent) => {
        //     const keyState = e.type === 'keydown';
        //     // eslint-disable-next-line default-case
        //     switch (e.keyCode) {
        //         case CONTROL_KEY.up:
        //             controller.up = keyState;
        //             break;
        //         case CONTROL_KEY.left:
        //             controller.left = keyState;
        //             break;
        //         case CONTROL_KEY.right:
        //             controller.right = keyState;
        //             break;
        //     }
        // };

        // document.addEventListener('keydown', handleHeroAction, false);
        // document.addEventListener('keyup', handleHeroAction, false);

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
            // document.removeEventListener('keydown', handleHeroAction, false);
            // document.addEventListener('keyup', handleHeroAction, false);
        };
    }, []);

    return canvasRef;
};
