import { IconButton, makeStyles, useTheme } from '@material-ui/core';
import { PauseCircleFilled, PlayCircleFilled } from '@material-ui/icons';
import { SizeProps } from 'client/core';
import { ColorVariant } from 'client/pages/Game/components/ColorBall';
import React, { memo, FC, useRef, useEffect, useState, useMemo } from 'react';
import { Point } from './utils';

export type CanvasProps = {
  handleGameOver: Function;
  variant: ColorVariant;
  size: SizeProps;
  id?: string;
};

const useStyles = makeStyles({
  btnPause: {
    position: 'absolute',
    right: 0,
    top: 20,
  },
});

export const Canvas: FC<CanvasProps> = memo(
  ({ handleGameOver, variant, size, id }: CanvasProps) => {
    const theme = useTheme();
    const classes = useStyles();

    const ref = useRef<HTMLCanvasElement>(null);
    const [controller, setController] = useState<Point[][]>([]);
    const [isDraw, setIsDraw] = useState(false);
    const [isPause, setIsPause] = useState(false);

    const newWorker = useMemo(
      () => new Worker(new URL('worker.ts', import.meta.url)),
      [],
    );

    useEffect(() => {
      if (ref?.current) { // ref вроде точно будет, current может не быть. То есть if (ref.current)
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
      if (ref?.current) {// можно сократить до ref.current?.requestFullscreen();
        ref.current.requestFullscreen();
      }
    };

    const getPoint = (e: MouseEvent) => {
      if (ref.current) {
        const canvas = ref.current;
        if (canvas) { // дубликат условия по сути (уже проверили ref.current, а canvas это ссылка на него)
          const tempController = controller;
          if (!tempController.length) {
            tempController.push([]);
          }
          const line = tempController[tempController.length - 1];
          let x = e.pageX - canvas?.offsetLeft; // здесь уже есть canvas (мы в теле условия) то есть canvas.offsetLeft
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
        setIsPause(false);
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

    useEffect(() => {
      if (ref?.current) {
        newWorker.postMessage({ event: 'isPause', isPause });
      }
    }, [isPause]);

    const handlePauseOrStartGame = () => {
      setIsPause(!isPause);
    };

    return (
      <>
        <canvas
          ref={ref}
          {...size}
          onDoubleClick={handleSetFullScreen}
          onMouseDown={handleStartBarrier}
          onMouseUp={handleEndBarrier}
          onMouseMove={handleDrawBarrier}
        />
        <IconButton
          onClick={handlePauseOrStartGame}
          className={classes.btnPause}
        >
          {!isPause ? <PauseCircleFilled /> : <PlayCircleFilled />}
        </IconButton>
      </>
    );
  },
);
