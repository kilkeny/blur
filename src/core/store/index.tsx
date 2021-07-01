import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { onTest } from './actions';
import { rootReducer } from './reducers';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

// TODO: Для тестирования заготовки. Убрать, когда будет добавлена настоящая логика
store.dispatch(onTest());
console.log(store.getState());
