import { GamePainter } from './Canvas.draw';

let obj = 1;
let canvas: OffscreenCanvas | null = null;
let width = 0;
let height = 0;
let pointer: GamePainter | null = null;
let intervalLoop: any;

const stop = () => {
  clearInterval(intervalLoop);
  intervalLoop = undefined;
};

const start = () => {
  intervalLoop = setInterval(() => {
    if (canvas && pointer) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        pointer.drawCanvas({ ctx, controller: [] }, () => stop());
      }
    }
  }, 15);
};

onmessage = function (evt) {
  console.log(evt);
  if (evt.data.event === 'createPointer') {
    pointer = new GamePainter({ width, height }, '100500', '#ff0000');
  }
  if (evt.data.event === 'start' && pointer) {
    obj = 0;
    console.log(intervalLoop);
    if (intervalLoop === undefined) {
      start();
    }
    // if (canvas) {
    //     const ctx = canvas.getContext("2d");
    //     if (ctx) {
    //         pointer.draw(ctx, obj);
    //     }
    // }
  }
  if (evt.data.event === 'stop' && pointer) {
    stop();
  }
  if (evt.data?.canvas) {
    canvas = evt.data.canvas as OffscreenCanvas;
    width = canvas.width;
    height = canvas.height;
  }
  console.log(evt, obj);
};
