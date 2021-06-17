import { ResourcesProps } from './utils/Resourse';

export interface DrawCanvasProps {
    ctx: CanvasRenderingContext2D;
    controller: any;
    resources?: ResourcesProps;
}
