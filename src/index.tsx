import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
// import { startServiceWorker } from '../sw/start_sw';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// startServiceWorker();
