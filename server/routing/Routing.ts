import express, { Express } from 'express';
import path from 'path';

export function routing(app: Express) {
  app.use(express.static(path.join(__dirname, './build')));

  app.get('*', (req, res) => {
    console.log(req.url);
    res.renderBundle(req.url);
  });
}
