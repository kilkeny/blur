/* eslint-disable import/no-cycle */
import { CONFIG } from './Canvas.consts';
import { Ball } from './utils/Ball';
import { Point } from './utils/Point';
import { Vector } from './utils/Vector';
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

    border: Vector;

    constructor () {
        this.drawCanvas = this.drawCanvas.bind(this);
        this.ball = new Ball(
            new Point(CONFIG.CANVAS.width * 0.3, CONFIG.CANVAS.height * 0.3),
        );

        const border = [];

        border.push(
            new Point(
                0.9 * (CONFIG.CANVAS.width - 10 * 2) + 10,
                0.2 * (CONFIG.CANVAS.height - 10 * 2) + 10,
            ),
        );
        border.push(
            new Point(
                0.1 * (CONFIG.CANVAS.width - 10 * 2) + 10,
                0.9 * (CONFIG.CANVAS.height - 10 * 2) + 10,
            ),
        );

        this.border = new Vector(border[0], border[1]);
    }

    static clearCanvas (ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = CONFIG.CANVAS.color;
        ctx.fillRect(0, 0, CONFIG.CANVAS.width, CONFIG.CANVAS.height);
    }

    drawCanvas (options: DrawCanvasProps) {
        const { ctx } = options;
        GamePainter.clearCanvas(ctx);
        this.ball.draw(options);
        this.ball.move();
        const nextStep = new Vector(
            this.ball.position,
            this.ball.getNextStep(),
        );
        if (Vector.Intersection(this.border, nextStep)) {
            const normal = this.border.getNormal();

            const scalar = Vector.Scalar(normal, nextStep);
            const reflection = nextStep.subVector(
                normal.multiplyScalar(2).multiplyScalar(scalar / normal.length),
            );
            const end = new Point(reflection.x, reflection.y);
            const start = new Point(0, 0);
            this.ball.speed = new Vector(start, end);
        }
        const p1 = this.border.start;
        const p2 = this.border.end;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = '#6ea3f1';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}
