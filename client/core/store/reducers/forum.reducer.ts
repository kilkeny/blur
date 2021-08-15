import { ActionProps, FORUM } from '../actions/action.types';

export const initialStateTheme = {};

export const forumReducer = (
  state = initialStateTheme,
  action: ActionProps,
) => {
  switch (action.type) {
  case FORUM.CREATE_TOPIC: {
    return { ...state, ...action.payload };
  }
  default:
    return state;
  }
};
