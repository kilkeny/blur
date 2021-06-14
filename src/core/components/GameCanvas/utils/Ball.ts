import { Point } from './Point';
import { Vector } from './Vector';

export interface BallProps {
    position: Point;
    speed: Vector;
    color: string;
    radius: number;
}

export class Ball implements BallProps {
    position!: Point;

    speed!: Vector;

    color: string;

    radius: number;

    constructor (position: Point) {
        this.position = position;
        const dx = new Point(4, 0);
        const dy = new Point(0, 4);
        this.speed = new Vector(dx, dy);
        this.radius = 4;
        this.color = 'red';
    }

    draw (): void {

    }
}
