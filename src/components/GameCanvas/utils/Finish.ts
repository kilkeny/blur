// eslint-disable-next-line import/no-cycle
import { DrawCanvasProps } from '../Canvas.types';
import { CONFIG } from '../Canvas.consts';
import { Point } from './Point';

export interface FinishParams {
  length: number;
  step: number;
  radius: number;
}

export class Finish implements FinishParams {
  position: Point;

  radius: number;

  length: number;

  step: number;

  distanse: number;

  startTime: number;

  endTime: number;

  color: string;

  constructor (position: Point, kt: number, color: string) {
    const { length, step, radius } = CONFIG.FINISH;
    this.position = position;
    this.radius = radius / kt;
    this.length = length;
    this.step = step / kt;
    this.startTime = 0;
    this.endTime = 0;
    this.distanse = (this.radius + this.step * this.length) ** 2;
    this.color = color;
  }

  draw (options: DrawCanvasProps) {
    const { ctx } = options;
    if (this.startTime === 0) {
      this.startTime = performance.now();
    }
    this.endTime = performance.now();
    Array(this.length)
      .fill(0)
      .forEach((_, index) => {
        ctx.beginPath();
        ctx.arc(
          this.position.x,
          this.position.y,
          this.radius + this.step * index,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = `rgba(255, 199, 0, ${0.1 + 1 / this.length})`;
        ctx.fill();
        ctx.closePath();
      });
  }

  render (options: DrawCanvasProps) {
    this.draw(options);
  }
}
