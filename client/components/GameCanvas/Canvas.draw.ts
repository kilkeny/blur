/* eslint-disable class-methods-use-this */ // тут вроде везде есть обращение к this
import { SizeProps } from '@core/hooks';
import { CONFIG } from './Canvas.consts';
import { Ball, Border, Finish, Point, Vector } from './utils';
import { DrawCanvasProps } from './Canvas.types';

export type ControllerProps = {
  up: boolean;
  left: boolean;
  right: boolean;
};

export class GamePainter {
  ball: Ball;

  borders: Border[];

  barriers: Border[];

  size: SizeProps;

  id: string;

  color: string;

  kt: number;

  finish: Finish;

  constructor(size: SizeProps, id: string, color: string) {
    this.drawCanvas = this.drawCanvas.bind(this); // а зачем это? Это тайпскрипт, тут с этим норм все)
    this.id = id;
    this.size = size;
    /*
    Можно сократить.
    TS позволяет писать так:
    class A {
      constructor(
        public a: string,
        private readonly b: number,
      ) {
        // здесь не нужно писать this.a = a; this.b = b и тд
      }
    }


     */
    const { width, height } = this.size;

    this.kt = CONFIG.LEVELS.width / this.size.width; // Лучше именовать "по понятней". Я вот не понимаю что за kt)
    // Другое дело что мне это понимать и не нужно, а вот если на ваш проект придет другой разработчик,
    // то ему придется код читать и вникать в него

    this.ball = new Ball(
      new Point(width * 0.2, height * 0.3),
      this.kt,
      color,
    );

    this.finish = new Finish(
      new Point(width * 0.12, height * 1.05),
      this.kt,
      color,
    );

    this.borders = []; // дефолтные значение можно выше указать borders: Border[] = [];
    this.barriers = [];
    this.color = color;
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
          start.transformMap(this.size),
          end.transformMap(this.size),
        );
      }
      const start = new Point(
        shape[shape.length - 1].x,
        shape[shape.length - 1].y,
      );
      const end = new Point(shape[0].x, shape[0].y);
      border.addLine(
        start.transformMap(this.size),
        end.transformMap(this.size),
      );
      this.borders.push(border);
    });
  }

  clearCanvas(ctx: OffscreenCanvasRenderingContext2D) {
    const { width, height } = this.size;
    ctx.fillStyle = CONFIG.CANVAS.color;
    ctx.fillRect(0, 0, width, height);
  }

  setBarriers(controller: Point[][]) {
    const barriers: Border[] = [];
    controller.forEach((line) => {
      if (line.length > 2) {
        const start = line[0];
        const end = line[line.length - 1];
        const barrier = new Border(
          this.color,
          CONFIG.BARRIER.fillColor,
        );
        barrier.addLine(start, end);
        barriers.push(barrier);
      }
    });
    this.barriers = barriers;
  }

  drawTime(options: DrawCanvasProps) {
    const { ctx } = options;
    const { endTime, startTime } = this.finish;

    ctx.fillStyle = this.color;
    ctx.font = '18px Comfortaa';
    ctx.fillText(`${Math.ceil(endTime - startTime)}`, this.size.width - 100, 50);
  }

  updateBorder(
    options: DrawCanvasProps,
    startPoint: Point,
    aroundPoints: Point[],
  ) {
    return (borders: Border[]) => {
      borders.forEach((border) => {
        const line = border.collision(startPoint, aroundPoints);
        border.render(options);
        if (line) {
          this.ball.reflection(line);
        }
      });
    };
  }

  drawCanvas(options: DrawCanvasProps, handleGameOver: Function) {
    const { ctx, resources, controller } = options;
    const { width, height } = this.size;

    this.clearCanvas(ctx);
    if (resources) {
      ctx.drawImage(resources.level, 0, 0, width, height);
    }

    if (this.ball.radius < 0) {
      handleGameOver(0);
      return;
    }

    this.finish.render(options);
    this.setBarriers(controller);
    this.ball.render(options);
    this.ball.move(this.size);

    const aroundPoints = this.ball
      .getNextStep()
      .getAround(this.ball.radius);

    const distanse = new Vector(this.ball.getNextStep(), this.finish.position);

    if (distanse.length < this.finish.distanse) {
      handleGameOver(
        Math.ceil(this.finish.endTime - this.finish.startTime),
      );
    }

    const updateBorder = this.updateBorder(
      options,
      this.ball.position,
      aroundPoints,
    );
    updateBorder(this.borders);
    updateBorder(this.barriers);
    this.drawTime(options);
  }
}
