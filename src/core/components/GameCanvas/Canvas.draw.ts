/* eslint-disable import/no-cycle */
import { CONFIG } from './Canvas.consts';
import { ResourcesProps } from './utils';
import { Ball } from './utils/Ball';
import { Point } from './utils/Point';
import { Vector } from './utils/Vector';

export type ControllerProps = {
    up: boolean;
    left: boolean;
    right: boolean;
};

export interface DrawCanvasProps {
    ctx: CanvasRenderingContext2D;
    controller: ControllerProps;
    resources?: ResourcesProps;
}

export interface DrawCanvasPartProps extends DrawCanvasProps {}

export class GamePainter {
    ball: Ball;

    border: Vector[];

    constructor () {
        this.drawCanvas = this.drawCanvas.bind(this);
        this.ball = new Ball(
            new Point(CONFIG.CANVAS.width * 0.3, CONFIG.CANVAS.height * 0.3),
        );

        const border = [];

        const x = JSON.parse(
            '[{"x":74,"y":73},{"x":74,"y":73},{"x":104,"y":360},{"x":104,"y":360},{"x":183,"y":567},{"x":183,"y":567},{"x":262,"y":659},{"x":263,"y":659},{"x":265,"y":659},{"x":267,"y":659},{"x":272,"y":659},{"x":276,"y":659},{"x":282,"y":659},{"x":287,"y":659},{"x":294,"y":659},{"x":305,"y":659},{"x":313,"y":659},{"x":317,"y":659},{"x":326,"y":659},{"x":334,"y":659},{"x":341,"y":659},{"x":348,"y":659},{"x":356,"y":659},{"x":362,"y":659},{"x":368,"y":659},{"x":374,"y":659},{"x":379,"y":658},{"x":380,"y":658},{"x":387,"y":657},{"x":389,"y":657},{"x":391,"y":656},{"x":394,"y":656},{"x":395,"y":655},{"x":397,"y":654},{"x":398,"y":654},{"x":399,"y":653},{"x":400,"y":653},{"x":401,"y":653},{"x":401,"y":653},{"x":401,"y":653},{"x":402,"y":653},{"x":402,"y":653}]',
        );

        for (let i = 0; i < x.length - 1; i += 1) {
            border.push(
                new Vector(
                    new Point(x[i].x, x[i].y),
                    new Point(x[i + 1].x, x[i + 1].y),
                ),
            );
        }
        this.border = border;
        // border.push(
        //     new Point(
        //         0.9 * (CONFIG.CANVAS.width - 10 * 2) + 10,
        //         0.2 * (CONFIG.CANVAS.height - 10 * 2) + 10,
        //     ),
        // );
        // border.push(
        //     new Point(
        //         0.1 * (CONFIG.CANVAS.width - 10 * 2) + 10,
        //         0.9 * (CONFIG.CANVAS.height - 10 * 2) + 10,
        //     ),
        // );

        // this.border = new Vector(border[1], border[0]);
    }

    static clearCanvas (ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = CONFIG.CANVAS.color;
        ctx.fillRect(0, 0, CONFIG.CANVAS.width, CONFIG.CANVAS.height);
    }

    drawCanvas (options: DrawCanvasProps) {
        const { ctx, resources } = options;
        // if (!resources) return;
        console.log(resources);
        GamePainter.clearCanvas(ctx);
        if (resources) {
            ctx.drawImage(
                resources.level,
                0,
                0,
                CONFIG.CANVAS.width,
                CONFIG.CANVAS.height,
            );
        }
        this.ball.draw(options);
        this.ball.move();
        const nextStep = new Vector(
            this.ball.position,
            this.ball.getNextStep(),
        );
        for (let index = 0; index < this.border.length; index += 1) {
            const element = this.border[index];
            if (Vector.Intersection(element, nextStep)) {
                this.ball.reflection(element);
            }
            const p1 = element.start;
            const p2 = element.end;
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
}
