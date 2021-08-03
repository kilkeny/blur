// eslint-disable-next-line import/no-cycle
import { DrawCanvasProps } from '../Canvas.types';
import { Point } from './Point';
import { Vector } from './Vector';

export interface BorderParams {
  lines: Vector[];
  lineColor: string;
  fillColor: string;
}

export class Border implements BorderParams {
  lines: Vector[];

  lineColor: string;

  fillColor: string;

  constructor (lineColor: string, fillColor: string) {
    this.lines = [];
    this.lineColor = lineColor;
    this.fillColor = fillColor;
  }

  addLine (start: Point, end: Point) {
    const line = new Vector(start, end);
    this.lines.push(line);
  }

  collision (startPoint: Point, aroundPoints: Point[]) {
    for (let j = 0; j < aroundPoints.length; j += 1) {
      const endPoint = aroundPoints[j];
      const v1 = new Vector(startPoint, endPoint);
      for (let i = 0; i < this.lines.length; i += 1) {
        if (Vector.isIntersection(this.lines[i], v1)) {
          return this.lines[i];
        }
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
      this.lines.forEach((line) => {
        const p2 = line.end;
        ctx.lineTo(p2.x, p2.y);
      });
      ctx.lineWidth = 2;
      ctx.strokeStyle = this.lineColor;
      ctx.fillStyle = this.fillColor;
      ctx.stroke();
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
