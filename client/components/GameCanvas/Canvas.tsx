import { useTheme } from '@material-ui/core';
import { SizeProps } from 'client/core';
import { ColorVariant } from 'client/pages/Game/components/ColorBall';
import React, { memo, FC, useRef, useEffect, useMemo, useState } from 'react';
import { Point } from './utils';

export type CanvasProps = {
  handleGameOver: Function;
  variant: ColorVariant;
  size: SizeProps;
  id?: string;
};

function fib(n:number): any {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

export const Canvas: FC<CanvasProps> = memo(
  ({ handleGameOver, variant, size, id }: CanvasProps) => {
    const theme = useTheme();

    const [state, setState] = useState(20);
    const ref = useRef<HTMLCanvasElement>(null);
    const [controller, setController] = useState<Point[][]>([]);
    const [isDraw, setIsDraw] = useState(false);

    const newWorker = useMemo(() => new Worker(new URL('worker.ts', import.meta.url)), []);

    useEffect(() => {
      if (ref?.current) {
        const canvas = ref.current;

        const offset = canvas.transferControlToOffscreen();
        newWorker.postMessage({ canvas: offset }, [offset]);
        newWorker.postMessage({
          event: 'createPointer',
          color: theme.palette[variant].main,
          id,
        });
        newWorker.postMessage({ event: 'start' });
      }
    }, []);

    newWorker.onmessage = (e) => {
      const { data } = e;
      if (data.event === 'end') {
        newWorker.terminate();
        handleGameOver(data.result);
      }
    };

    const handleSetFullScreen = () => {
      if (ref?.current) {
        ref.current.requestFullscreen();
      }
    };

    const getPoint = (e: MouseEvent) => {
      if (ref.current) {
        const canvas = ref.current;
        if (canvas) {
          const tempController = controller;
          if (!tempController.length) {
            tempController.push([]);
          }
          const line = tempController[tempController.length - 1];
          let x = e.pageX - canvas?.offsetLeft;
          let y = e.pageY - canvas?.offsetTop;
          if (canvas.offsetTop === 0) {
            const fullRatio = window.innerWidth / size.width;
            const fullHeight = fullRatio * size.height;
            y -= (window.innerHeight - fullHeight) / 2;
            y /= fullRatio;
            x /= fullRatio;
          }
          const point = new Point(x, y);
          line.push(point);
          setController(tempController);
        }
      }
    };

    useEffect(() => {
      if (controller.length) {
        newWorker.postMessage({ event: 'controller', controller });
      }
    }, [controller]);

    const handleStartBarrier = (e: any) => {
      getPoint(e);
      setIsDraw(true);
    };

    const handleDrawBarrier = (e: any) => {
      if (isDraw) {
        getPoint(e);
      }
    };

    const handleEndBarrier = (e: any) => {
      getPoint(e);
      setIsDraw(false);
      setController([...controller, []]);
    };

    setInterval(() => {
      setState(state + 1);
    }, 10);

    return (
      <>
        <span style={{ position: 'absolute' }}>{fib(state)}</span>
        <canvas
          ref={ref}
          {...size}
          onDoubleClick={handleSetFullScreen}
          onMouseDown={handleStartBarrier}
          onMouseUp={handleEndBarrier}
          onMouseMove={handleDrawBarrier}
        />
      </>
    );
  },
);
