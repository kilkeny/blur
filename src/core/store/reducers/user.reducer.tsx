import { ActionProps, USER } from '../actions/action.types';

const initialState = {};

export const userReducer = (state = initialState, { type, payload }: ActionProps) => {
  if (type === USER.FETCH) {
    return { ...payload };
  }

  if (type === USER.UPDATE) {
    return { ...state, ...payload };
  }

  return state;
};
