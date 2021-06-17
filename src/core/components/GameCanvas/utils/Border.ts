// eslint-disable-next-line import/no-cycle
import { DrawCanvasProps } from '../Canvas.draw';
import { Point } from './Point';
import { Vector } from './Vector';

export interface IBorder {
    lines: Vector[];
    color: string;
}

export class Border implements IBorder {
    lines: Vector[];

    color: string;

    constructor (color: string) {
        this.lines = [];
        this.color = color;
    }

    addLine (start: Point, end: Point) {
        const line = new Vector(start, end);
        this.lines.push(line);
    }

    static drawLine (ctx: CanvasRenderingContext2D, line: Vector) {
        const p2 = line.end;
        ctx.lineTo(p2.x, p2.y);
    }

    collision (v1: Vector) {
        for (let i = 0; i < this.lines.length; i += 1) {
            if (Vector.Intersection(this.lines[i], v1)) {
                return this.lines[i];
            }
        }
        return null;
    }

    draw (ctx: CanvasRenderingContext2D) {
        if (this.lines.length) {
            ctx.save();
            ctx.beginPath();
            const { start } = this.lines[0];
            ctx.moveTo(start.x, start.y);
            this.lines.forEach((line) => Border.drawLine(ctx, line));
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            ctx.fillStyle = '#F8F8F8';
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
    }

    render (options: DrawCanvasProps) {
        const { ctx } = options;
        this.draw(ctx);
    }
}
