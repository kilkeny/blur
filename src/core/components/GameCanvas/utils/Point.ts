import { CONFIG } from '../Canvas.consts';

export interface PointProps {
    x: number;
    y: number;
}

export class Point implements PointProps {
    x: number;

    y: number;

    constructor (x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    transformMap () {
        const dx = CONFIG.CANVAS.width / CONFIG.LEVELS.width;
        const dy = CONFIG.CANVAS.height / CONFIG.LEVELS.height;
        this.x *= dx;
        this.y *= dy;
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > CONFIG.CANVAS.width) {
            this.x = CONFIG.CANVAS.width;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > CONFIG.CANVAS.height) {
            this.y = CONFIG.CANVAS.height;
        }

        return new Point(Math.ceil(this.x), Math.ceil(this.y));
    }
}
