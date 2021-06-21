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

    getAround (buffer: number) {
        // 1 - означает "+", -1 - означает "-"",
        const { x, y } = this;
        const combinePosition = [
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1],
        ];
        const aroundPoints = combinePosition.map(
            ([dx, dy]) => new Point(x + dx * buffer, y + dy * buffer),
        );
        return aroundPoints;
    }

    transformMap () {
        const { width, height } = CONFIG.CANVAS;
        const dx = width / CONFIG.LEVELS.width;
        const dy = height / CONFIG.LEVELS.height;
        this.x *= dx;
        this.y *= dy;
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > width) {
            this.x = width;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > height) {
            this.y = height;
        }

        return new Point(Math.ceil(this.x), Math.ceil(this.y));
    }
}
