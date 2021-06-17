/* eslint-disable import/no-cycle */
import { CONFIG } from './Canvas.consts';
import { ResourcesProps } from './utils';
import { Ball } from './utils/Ball';
import { Border } from './utils/Border';
import { Point } from './utils/Point';
import { Vector } from './utils/Vector';

export type ControllerProps = {
    up: boolean;
    left: boolean;
    right: boolean;
};

export interface DrawCanvasProps {
    ctx: CanvasRenderingContext2D;
    controller: any;
    resources?: ResourcesProps;
}

export interface DrawCanvasPartProps extends DrawCanvasProps {}

export class GamePainter {
    ball: Ball;

    borders: Border[];

    barriers: Border[];

    constructor () {
        this.drawCanvas = this.drawCanvas.bind(this);
        this.ball = new Ball(
            new Point(CONFIG.CANVAS.width * 0.2, CONFIG.CANVAS.height * 0.3),
        );
        this.borders = [];
        this.barriers = [];

        const shapes = Object.values(CONFIG.LEVELS.LEVEL1);

        shapes.forEach((shape) => {
            const border = new Border('red');
            for (let i = 0; i < shape.length - 1; i += 1) {
                const start = new Point(shape[i].x, shape[i].y);
                const end = new Point(shape[i + 1].x, shape[i + 1].y);
                border.addLine(start, end);
            }
            const start = new Point(
                shape[shape.length - 1].x,
                shape[shape.length - 1].y,
            );
            const end = new Point(shape[0].x, shape[0].y);
            border.addLine(start, end);
            this.borders.push(border);
        });
    }

    static clearCanvas (ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = CONFIG.CANVAS.color;
        ctx.fillRect(0, 0, CONFIG.CANVAS.width, CONFIG.CANVAS.height);
    }

    setBarriers (controller: any) {
        const barriers: Border[] = [];
        controller.forEach((line: any[]) => {
            if (line.length > 2) {
                const start = line[0];
                const end = line[line.length - 1];
                const barrier = new Border('rgb(44, 0, 255)');
                barrier.addLine(start, end);
                barriers.push(barrier);
            }
        });
        this.barriers = barriers;
    }

    updateBorder (
        options: DrawCanvasProps,
        nextStep: Vector,
        borders: Border[],
    ) {
        borders.forEach((border) => {
            const line = border.collision(nextStep);
            border.render(options);
            if (line) {
                this.ball.reflection(line);
            }
        });
    }

    drawCanvas (options: DrawCanvasProps) {
        const { ctx, resources, controller } = options;
        // if (!resources) return;

        this.setBarriers(controller);
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

        this.updateBorder(options, nextStep, this.borders);
        this.updateBorder(options, nextStep, this.barriers);
    }
}
