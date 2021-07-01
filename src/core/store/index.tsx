import { createStore } from 'redux';
import { onTest } from './actions';
import { rootReducer } from './reducers';

export const store = createStore(rootReducer);

// TODO: Для тестирования заготовки. Убрать, когда будет добавлена настоящая логика
store.dispatch(onTest());
console.log(store.getState());
