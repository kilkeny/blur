import { createStore, combineReducers, applyMiddleware, compose, Middleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

function configureStore(reducers = {}, initialState = {}) {
  const middlewares: Middleware[] = [
    thunkMiddleware,
  ];

  const store = createStore(
    combineReducers(reducers),
    initialState,
    compose(applyMiddleware(...middlewares)),
  );
  store.dispatch({ type: '@@redux/INIT' });

  // if ((module as any).hot) {
  //   (module as any).hot.accept('./reducers', () => {
  //     const nextRootReducer = require('./reducers').default;
  //     store.replaceReducer(nextRootReducer);
  //   });
  // }

  return { store };
}

export default configureStore;
