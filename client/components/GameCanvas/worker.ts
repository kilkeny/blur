import { v4 as uuid } from 'uuid';
import { GamePainter } from './Canvas.draw';
import { Point } from './utils';

let canvas: OffscreenCanvas | null = null;
let width = 0;
let height = 0;
let pointer: GamePainter | undefined;
let intervalLoop: any;
let controller: Point[][] = [];

const stop = (result: number) => {
  intervalLoop = undefined;
  pointer = undefined;

  // @ts-ignore
  postMessage({ event: 'end', result });
};

const start = () => {
  if (intervalLoop) {
    clearInterval(intervalLoop);
  }
  intervalLoop = undefined;
  console.log('start', pointer);
  intervalLoop = setInterval(() => {
    if (canvas && pointer) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        pointer.drawCanvas({ ctx, controller }, (result: number) => stop(result));
      }
    }
  }, 16);
};
onmessage = (event) => {
  if (event.data.event === 'createPointer') {
    const { color } = event.data;

    pointer = new GamePainter({ width, height }, uuid(), color);
  }
  if (event.data.event === 'start' && pointer) {
    start();
  }

  if (event.data.event === 'controller') {
    controller = event.data.controller;
    start();
  }

  if (event.data?.canvas) {
    canvas = event.data.canvas as OffscreenCanvas;
    width = canvas.width;
    height = canvas.height;
  }

  console.log(event.data);
};
