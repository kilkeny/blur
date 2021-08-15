import { CreateTopicProps, ForumAPI } from 'client/core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreProps } from '../store.types';
import { FORUM } from './action.types';

export const addTopic = (payload: CreateTopicProps) => ({
  type: FORUM.CREATE_TOPIC,
  payload,
});

export const createTopicThunk = (
  topic: CreateTopicProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => async (dispatch) => {
  const result = await ForumAPI.createTopic(topic);
  dispatch(addTopic(result));
};
