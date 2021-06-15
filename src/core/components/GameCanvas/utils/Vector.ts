import { Point } from './Point';

export class Vector extends Point {
    start: Point;

    end: Point;

    length: number;

    constructor (start: Point, end: Point) {
        const x = end.x - start.x;
        const y = end.y - start.y;
        super(x, y);
        this.length = (end.x - start.x) * (end.x - start.x)
            + (end.y - start.y) * (end.y - start.y);
        this.start = start;
        this.end = end;
    }

    getNormal () {
        const x = this.start.y - this.end.y;
        const y = this.end.x - this.start.x;
        const end = new Point(x, y);
        const start = new Point(0, 0);
        const normal = new Vector(start, end);
        return normal;
    }

    reflectionY () {
        const { start } = this;
        const end = new Point(this.end.x, -this.end.y);
        return new Vector(start, end);
    }

    reflectionX () {
        const { start } = this;
        const end = new Point(-this.end.x, this.end.y);
        return new Vector(start, end);
    }

    rotate () {
        const { start } = this;
        const end = new Point(-this.end.x, -this.end.y);
        return new Vector(start, end);
    }

    subVector (v1: Vector) {
        this.x -= v1.x;
        this.y -= v1.y;
        return this;
    }

    addVector (v1: Vector) {
        this.x += v1.x;
        this.y += v1.y;
        return this;
    }

    multiplyScalar (n: number) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    static Scalar (v1: Vector, v2: Vector) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    static Product (v1: Vector, v2: Vector) {
        return v1.x * v2.y - v2.x * v1.y;
    }

    static Intersection (v12: Vector, v34: Vector) {
        const p1 = v12.start;
        const p2 = v12.end;
        const p3 = v34.start;
        const p4 = v34.end;

        // Первая проверка что точки P1 и P2 находятся слева и справа от V34
        // Требуется найти векторные произведения V34 * V31, V34 * V32
        const v31 = new Vector(p3, p1);
        const m134 = Vector.Product(v34, v31);
        const v32 = new Vector(p3, p2);
        const m234 = Vector.Product(v34, v32);

        // Вторая проверка что точки P3 и P4 находятся слева и справа от V12
        // Требуется найти векторные произведения V12 * V13, V12 * V14
        const v13 = new Vector(p1, p3);
        const m312 = Vector.Product(v12, v13);
        const v14 = new Vector(p1, p4);
        const m412 = Vector.Product(v12, v14);
        return m134 * m234 < 0 && m312 * m412 < 0;
    }
}
