import { composeStore } from '@core/store';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './App';
// import { startServiceWorker } from '../sw/start_sw';

// eslint-disable-next-line no-underscore-dangle
const store = composeStore(window.__INITIAL_STATE__);
// eslint-disable-next-line no-underscore-dangle
console.log(window.__INITIAL_STATE__);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// startServiceWorker();
