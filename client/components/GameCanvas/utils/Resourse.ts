/* eslint-disable no-underscore-dangle */
export interface ResourcesProps {
  [key: string]: HTMLImageElement;
}

export interface CanvasResourcesProps {
  [key: string]: string;
}

interface LoadStatusesProps {
  [key: string]: boolean;
}

export class ResourcesLoader {
  static _resources: ResourcesProps = {};

  static _loadStatuses: LoadStatusesProps = {};

  static _renderCanvas: Function;

  static load (resources: CanvasResourcesProps) {
    Object.entries(resources).forEach((resource) => {
      this._load(...resource);
    });
  }

  static _load (key: string, url: string) {
    const img = new Image();
    img.src = url;
    this._loadStatuses[key] = false;

    img.onload = () => {
      this._resources[key] = img;
      this._loadStatuses[key] = true;

      if (this.isReady()) {
        this._renderCanvas(this._resources);
      }
    };
  }

  static isReady () {
    let ready = true;

    Object.keys(this._loadStatuses).forEach((key) => {
      if (!this._loadStatuses[key]) {
        ready = false;
      }
    });

    return ready;
  }

  static onReady (renderCanvas: Function) {
    this._resources = {};
    this._renderCanvas = renderCanvas;
  }
}
