import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { thunkGetUser } from './actions';
import { rootReducer } from './reducers';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

// @ts-ignore
store.dispatch(thunkGetUser());
