import { CONFIG } from './Canvas.consts';
import { Ball } from './utils/Ball';
import { Point } from './utils/Point';
// import { LEVEL_CONFIG } from './Canvas.levels';
// import { maps } from './maps';
// import {
//     Hero, IJumper, Jumper, Live, ResourcesProps, Timer,
// } from './utils';
// import { Finish } from './utils/Finish';
// import { Hedgehog } from './utils/Hedgehog';

export type ControllerProps = {
    up: boolean;
    left: boolean;
    right: boolean;
};

export interface DrawCanvasProps {
    ctx: CanvasRenderingContext2D;
    controller: ControllerProps;
    // resources?: ResourcesProps;
}

export interface DrawCanvasPartProps extends DrawCanvasProps {}

export class GamePainter {
    ball: Ball;

    constructor() {
        this.drawCanvas = this.drawCanvas.bind(this);
        this.ball = new Ball(
            new Point(CONFIG.CANVAS.width * 0.3, CONFIG.CANVAS.height * 0.3),
        );
        // this.border =
    }

    static clearCanvas(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = CONFIG.CANVAS.color;
        ctx.fillRect(0, 0, CONFIG.CANVAS.width, CONFIG.CANVAS.height);
    }

    drawCanvas(
        options: DrawCanvasProps,
        handleGameOver: Function,
        handleNextLevel: Function,
        level: number,
    ) {
        const { ctx } = options;
    }
}
