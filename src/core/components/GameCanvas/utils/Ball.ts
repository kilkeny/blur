// eslint-disable-next-line import/no-cycle
import { DrawCanvasProps } from '../Canvas.draw';
import { CONFIG } from '../Canvas.consts';
import { Point } from './Point';
import { Vector } from './Vector';

export interface IBall {
    position: Point;
    speed: Vector;
    color: string;
    radius: number;
    blur: Point[];
    length: number;
}

export class Ball implements IBall {
    position!: Point;

    speed!: Vector;

    length: number;

    blur: Point[];

    color: string;

    radius: number;

    constructor (position: Point) {
        this.position = position;
        const start = new Point(0, 0);
        const end = new Point(7, 7);
        this.speed = new Vector(start, end);
        this.radius = 7;
        this.color = 'red';
        this.length = 10;
        this.blur = [];
    }

    move () {
        if (this.left() < 0 || this.right() > CONFIG.CANVAS.width) {
            this.speed = this.speed.reflectionX();
        }
        if (this.top() < 0 || this.bottom() > CONFIG.CANVAS.height) {
            this.speed = this.speed.reflectionY();
        }
        this.setNewPosition(this.getNextStep());

        if (this.blur.length >= this.length) {
            this.blur.shift();
        }
        this.blur.push(this.position);
    }

    reflection (border: Vector) {
        const normal = border.getNormal();
        const nextStep = new Vector(this.position, this.getNextStep());

        const scalar = Vector.Scalar(normal, nextStep);
        const reflection = nextStep.subVector(
            normal.multiplyScalar(2).multiplyScalar(scalar / normal.length),
        );
        const end = new Point(reflection.x, reflection.y);
        const start = new Point(0, 0);
        this.speed = new Vector(start, end);
    }

    getNextStep () {
        const x = this.position.x + this.speed.x;
        const y = this.position.y + this.speed.y;
        return new Point(x, y);
    }

    setNewPosition (position: Point) {
        this.position = position;
    }

    left () {
        return this.position.x - this.radius;
    }

    right () {
        return this.position.x + this.radius;
    }

    top () {
        return this.position.y - this.radius;
    }

    bottom () {
        return this.position.y + this.radius;
    }

    drawNormal (ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(
            this.position.x + this.speed.x * 5,
            this.position.y + this.speed.y * 5,
        );
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    draw (options: DrawCanvasProps) {
        const { ctx } = options;

        this.blur.forEach((pos, index) => {
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, this.radius * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(66, 0, 255, ${(1 / this.length) * index})`;
            ctx.fill();
            ctx.closePath();
        });
    }

    render (options: DrawCanvasProps) {
        this.draw(options);
    }
}
