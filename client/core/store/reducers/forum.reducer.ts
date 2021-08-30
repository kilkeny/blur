import { ActionProps, FORUM } from '../actions/action.types';
import { ForumProps } from '../store.types';

export const initialStateForum = [] as ForumProps;

export const forumReducer = (
  state = initialStateForum,
  action: ActionProps,
) => {
  switch (action.type) {
  case FORUM.SET:
    return [...action.payload];
  case FORUM.CREATE_TOPIC:
    return [action.payload, ...state];
  case FORUM.DELETE_TOPIC:
    return state.filter(({ id }) => id !== action.payload.id);
  case FORUM.ADD_COMMENT: {
    const { payload } = action;
    return state.map((topic) => (topic.id === payload.topicid
      ? { ...topic, comments: [...topic.comments, payload] }
      : topic));
  }
  case FORUM.REMOVE_COMMENT: {
    const { topicid, commentid } = action.payload;
    return state.map((topic) => {
      if (topic.id === topicid) {
        const arr = topic.comments.filter((item) => item.commentid !== commentid);
        return { ...topic, comments: arr };
      }
      return topic;
    });
  }
  case FORUM.CLEAR:
    return initialStateForum;
  default:
    return state;
  }
};
