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
    controller: any;
    resources?: ResourcesProps;
}

export interface DrawCanvasPartProps extends DrawCanvasProps {}

export class GamePainter {
    ball: Ball;

    borders: Vector[][];

    bordersUser: Vector[][];

    constructor () {
        this.drawCanvas = this.drawCanvas.bind(this);
        this.ball = new Ball(
            new Point(CONFIG.CANVAS.width * 0.2, CONFIG.CANVAS.height * 0.3),
        );
        this.borders = [];
        this.bordersUser = [];
        // const border = [];
        const shapes = Object.values(CONFIG.LEVELS.LEVEL1);
        console.log(shapes);
        shapes.forEach((shape) => {
            const border = [];
            for (let i = 0; i < shape.length - 1; i += 1) {
                const start = new Point(shape[i].x, shape[i].y);
                const end = new Point(shape[i + 1].x, shape[i + 1].y);
                border.push(new Vector(start, end));
            }
            const start = new Point(
                shape[shape.length - 1].x,
                shape[shape.length - 1].y,
            );
            const end = new Point(shape[0].x, shape[0].y);
            border.push(new Vector(end, start));
            this.borders.push(border);
        });
        console.log(this.borders);

        // for (let i = 0; i < x.length - 1; i += 1) {
        //     border.push(
        //         new Vector(
        //             new Point(x[i].x, x[i].y),
        //             new Point(x[i + 1].x, x[i + 1].y),
        //         ),
        //     );
        // }
        // this.border = border;
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

    setBorder (controller: any) {
        const borders = [];
        for (let i = 0; i < controller.length; i += 1) {
            const line = controller[i];
            const border = [];
            for (let j = 0; j < line.length - 1; j += 1) {
                const start = line[j];
                const end = line[j + 1];
                border.push(new Vector(start, end));
            }
            borders.push(border);
        }
        this.bordersUser = borders;
    }

    drawCanvas (options: DrawCanvasProps) {
        const { ctx, resources, controller } = options;
        // if (!resources) return;
        this.setBorder(controller);
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
        for (let i = 0; i < this.borders.length; i += 1) {
            const border = this.borders[i];
            for (let index = 0; index < border.length; index += 1) {
                const element = border[index];
                if (Vector.Intersection(element, nextStep)) {
                    this.ball.reflection(element);
                }
                // const p1 = element.start;
                // const p2 = element.end;
                // ctx.save();
                // ctx.beginPath();
                // ctx.moveTo(p1.x, p1.y);
                // ctx.lineTo(p2.x, p2.y);
                // ctx.strokeStyle = '#6ea3f1';
                // ctx.lineWidth = 3;
                // ctx.stroke();
                // ctx.closePath();
                // ctx.restore();
            }
        }

        for (let i = 0; i < this.bordersUser.length; i += 1) {
            const border = this.bordersUser[i];
            for (let index = 0; index < border.length; index += 1) {
                const element = border[index];
                if (Vector.Intersection(element, nextStep)) {
                    this.ball.reflection(element);
                }
                const p1 = element.start;
                const p2 = element.end;
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = 'green';
                ctx.lineWidth = 3;
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }
        }
    }
}
