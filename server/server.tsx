import React from 'react';
import express, { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import htmlescape from 'htmlescape';
import { Provider as ReduxProvider } from 'react-redux';
import compression from 'compression';
import configureStore from '../src/core/store/store-server';
import { App } from '../src/App';
import { rootReducer } from '../src/core/store/reducers';
import { STATIC_DIR, BUILD_DIR } from '../webpack/consts';

const app = express();
const PORT = process.env.PORT || 3000;

function makeHTMLPage(content: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>From SSR with Love</title>
    </head>
    <body>
        <div id="root">${htmlescape(content)}</div>
    </body>
    </html>
`;
}

app
  .use(compression())
  .use(express.static(BUILD_DIR))
  .use(express.static(STATIC_DIR));

app.get('/', (req: Request, res: Response) => {
  const { store } = configureStore(rootReducer, {});
  const jsx = (
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  );
  // const jsx = (<div>Hello</div>);
  const appContentHTML = renderToString(jsx);
  res.send(makeHTMLPage(appContentHTML));
});

app.listen(PORT, () => {
  console.log(`App on http://localhost:${PORT}`);
});
