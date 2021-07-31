import { composeStore, history } from '@core/store';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { ConnectedRouter } from 'connected-react-router';
import { App } from './App';
// import { startServiceWorker } from '../sw/start_sw';

// eslint-disable-next-line no-underscore-dangle
const store = composeStore(window.__INITIAL_STATE__);

const RootComponent = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

const RootComponentWithHot = hot(RootComponent);

ReactDOM.hydrate(
  <RootComponentWithHot />,
  document.getElementById('root'),
);

// startServiceWorker();