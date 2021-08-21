import { ActionProps, FORUM } from '../actions/action.types';
import { ForumProps } from '../store.types';

export const initialStateForum = [] as ForumProps;

export const forumReducer = (
  state = initialStateForum,
  action: ActionProps,
) => {
  switch (action.type) {
  case FORUM.SET: {
    return [...state, ...action.payload];
  }
  case FORUM.CREATE_TOPIC: {
    return [...state, action.payload];
  }
  case FORUM.DELETE_TOPIC: {
    return state.filter(({ id }) => id !== action.payload.id);
  }
  case FORUM.CLEAR: {
    return initialStateForum;
  }
  default:
    return state;
  }
};
