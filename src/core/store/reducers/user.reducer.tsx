import { ActionProps, USER } from '../actions/action.types';
import { StoreProfileProps } from '../store.types';

const initialState = { isAuth: false } as StoreProfileProps;

export const userReducer = (
  state = initialState,
  { type, payload }: ActionProps,
) => {
  switch (type) {
  case USER.FETCH:
    return { ...state, ...payload };
  case USER.UPDATE:
    return { ...state, ...payload };
  case USER.SET_AUTH:
    return { ...state, isAuth: payload };
  default:
    return state;
  }
};
