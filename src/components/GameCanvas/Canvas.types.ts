// eslint-disable-next-line import/no-cycle
import { Point, ResourcesProps } from './utils';

export interface DrawCanvasProps {
  ctx: CanvasRenderingContext2D;
  controller: Point[][];
  resources?: ResourcesProps;
}
