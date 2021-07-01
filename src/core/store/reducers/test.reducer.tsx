import { ActionProps, TEST } from '../actions/action.types';
import { StoreTestProps } from '../store.types';

const initialState: StoreTestProps = {
  test: 'test',
};

export const testReducer = (state = initialState, { type }: ActionProps) => {
  if (type === TEST.ACTION_NAME) {
    return { ...state, foo: 'bar' };
  }

  return state;
};
