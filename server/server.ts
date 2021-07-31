import express from 'express';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import cookieParser from 'cookie-parser';
import webpack, { Configuration } from 'webpack';

import * as webpackConfig from '../webpack.config.client';
import { renderBundle } from './middlewares/renderBundle';
import { routing } from './routing';

const compiler = webpack(webpackConfig as Configuration);

export class Server {
  private app;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
  }

  private config() {
    this.app.use(cookieParser());
    this.app.use(devMiddleware(compiler, {
      serverSideRender: true,
      writeToDisk: true,
      publicPath: '/',
    }));
    this.app.use(hotMiddleware(compiler));
    this.app.use(renderBundle);
  }

  private routerConfig() {
    routing(this.app);
  }

  public start = (port: number) => new Promise((resolve, reject) => {
    this.app.listen(port, () => {
      resolve(port);
    }).on('error', (err: Object) => reject(err));
  });
}
