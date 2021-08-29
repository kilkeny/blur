import { SizeProps } from 'client/core';
import { GamePainter } from './Canvas.draw';
import { Point } from './utils';

const size: SizeProps = { width: 0, height: 0 };
let canvas: OffscreenCanvas | null = null;
let pointer: GamePainter | undefined;

let intervalLoop: NodeJS.Timer | undefined;
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
    const { color, id } = event.data;

    pointer = new GamePainter(size, id, color);
  }
  if (event.data.event === 'start' && pointer) {
    start();
  }

  if (event.data.event === 'controller') {
    controller = event.data.controller;
    start();
  }

  if (event.data.event === 'isPause') {
    const { isPause } = event.data;
    if (isPause) {
      if (intervalLoop) {
        clearInterval(intervalLoop);
      }
    } else {
      start();
    }
  }

  if (event.data?.canvas) {
    canvas = event.data.canvas as OffscreenCanvas;
    size.width = canvas.width;
    size.height = canvas.height;
  }
};
