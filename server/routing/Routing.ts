import express, { Express } from 'express';
import path from 'path';
import { BUILD_DIR } from '../../env';

export function routing(app: Express) {
  app.use(express.static(path.join(__dirname, BUILD_DIR)));

  app.get('*', (req, res) => {
    res.renderBundle(req.url);
  });
}
