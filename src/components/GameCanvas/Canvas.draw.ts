import { CONFIG } from './Canvas.consts';
import { Ball, Border, Point, Vector, Finish } from './utils';
import { DrawCanvasProps } from './Canvas.types';

export type ControllerProps = {
  up: boolean;
  left: boolean;
  right: boolean;
};

type SizeProps = {
  width: number;
  height: number;
};

export class GamePainter {
  ball: Ball;

  borders: Border[];

  barriers: Border[];

  width: number;

  height: number;

  finish: Finish;

  constructor (size: SizeProps) {
    this.drawCanvas = this.drawCanvas.bind(this);

    this.finish = new Finish();
    this.width = size.width;
    this.height = size.width;
    this.ball = new Ball(new Point(this.width * 0.2, this.height * 0.3));
    this.borders = [];
    this.barriers = [];

    const shapes = Object.values(CONFIG.LEVELS.LEVEL1);

    shapes.forEach((shape) => {
      const border = new Border(
        CONFIG.LEVELS.lineColor,
        CONFIG.LEVELS.fillColor,
      );
      for (let i = 0; i < shape.length - 1; i += 1) {
        const start = new Point(shape[i].x, shape[i].y);
        const end = new Point(shape[i + 1].x, shape[i + 1].y);
        border.addLine(
          start.transformMap(this.width, this.height),
          end.transformMap(this.width, this.height),
        );
      }
      const start = new Point(
        shape[shape.length - 1].x,
        shape[shape.length - 1].y,
      );
      const end = new Point(shape[0].x, shape[0].y);
      border.addLine(
        start.transformMap(this.width, this.height),
        end.transformMap(this.width, this.height),
      );
      this.borders.push(border);
    });
  }

  clearCanvas (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = CONFIG.CANVAS.color;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  setBarriers (controller: Point[][]) {
    const barriers: Border[] = [];
    controller.forEach((line) => {
      if (line.length > 2) {
        const start = line[0];
        const end = line[line.length - 1];
        const barrier = new Border(
          CONFIG.BARRIER.lineColor,
          CONFIG.BARRIER.fillColor,
        );
        barrier.addLine(start, end);
        barriers.push(barrier);
      }
    });
    this.barriers = barriers;
  }

  updateBorder (
    options: DrawCanvasProps,
    startPoint: Point,
    aroundPoints: Point[],
    borders: Border[],
  ) {
    borders.forEach((border) => {
      const line = border.collision(startPoint, aroundPoints);
      border.render(options);
      if (line) {
        this.ball.reflection(line);
      }
    });
  }

  drawCanvas (options: DrawCanvasProps, handleGameOver: Function) {
    const { ctx, resources, controller } = options;
    if (!resources) return;

    this.clearCanvas(ctx);

    if (resources) {
      ctx.drawImage(resources.level, 0, 0, this.width, this.height);
    }

    this.setBarriers(controller);
    this.finish.render(options);
    this.ball.draw(options);
    this.ball.move(this.width, this.height);

    const aroundPoints = this.ball
      .getNextStep()
      .getAround(this.ball.radius);

    const dis = new Vector(this.ball.getNextStep(), this.finish.position);

    if (dis.length < this.finish.distanse) {
      handleGameOver(
        Math.ceil(this.finish.endTime - this.finish.startTime),
      );
    }
    this.updateBorder(
      options,
      this.ball.position,
      aroundPoints,
      this.borders,
    );
    this.updateBorder(
      options,
      this.ball.position,
      aroundPoints,
      this.barriers,
    );
  }
}
