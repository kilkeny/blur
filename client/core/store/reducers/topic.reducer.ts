import { ActionProps, TOPIC } from '../actions/action.types';
import { TopicType } from '../store.types';

export const initialStateCurrentTopic = {} as TopicType;

export const currentTopicReducer = (
  state = initialStateCurrentTopic,
  action: ActionProps,
) => {
  switch (action.type) {
  case TOPIC.SET:
    return { ...action.payload };
  case TOPIC.ADD_COMMENT: {
    return { ...state, comments: [...state.comments, action.payload] };
  }
  case TOPIC.REMOVE_COMMENT: {
    const arr = state.comments.filter((item) => item.commentid !== action.payload.commentid);
    return { ...state, comments: arr };
  }
  case TOPIC.CLEAR:
    return initialStateCurrentTopic;
  default:
    return state;
  }
};
