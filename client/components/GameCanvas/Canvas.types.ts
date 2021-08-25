// eslint-disable-next-line import/no-cycle
import { Point, ResourcesProps } from './utils';

export interface DrawCanvasProps {
  ctx: OffscreenCanvasRenderingContext2D;
  controller: Point[][];
  resources?: ResourcesProps;
}
