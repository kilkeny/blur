export interface PointProps {
    x: number;
    y: number;
}

export class Point implements PointProps {
    x: number;

    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
