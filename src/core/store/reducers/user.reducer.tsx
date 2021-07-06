import { ActionProps, USER } from '../actions/action.types';
import { StoreUserProps } from '../store.types';

const initialState: StoreUserProps = {
  user: null,
};

export const userReducer = (state = initialState, { type, payload }: ActionProps) => {
  if (type === USER.FETCH) {
    return { ...state, user: payload };
  }

  return state;
};
