import { CreateTopicProps, TopicId, ForumAPI } from 'client/core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ForumProps, StoreProps } from '../store.types';
import { FORUM } from './action.types';
import { showSnackBarAction } from './snackbar.actions';

export const setForumAction = (payload: ForumProps) => ({
  type: FORUM.SET,
  payload,
});

export const createTopicAction = (payload: CreateTopicProps) => ({
  type: FORUM.CREATE_TOPIC,
  payload,
});

export const deleteTopicAction = (payload: TopicId) => ({
  type: FORUM.DELETE_TOPIC,
  payload,
});

export const clearForumAction = () => ({
  type: FORUM.CLEAR,
});

export const getTopicsThunk = ():
ThunkAction<void, StoreProps, unknown, Action<string>> => async (dispatch) => {
  try {
    const result = await ForumAPI.getTopics();
    dispatch(setForumAction(result));
  } catch (error) {
    dispatch(showSnackBarAction({ type: 'error', msg: 'Error' }));
  }
};

export const createTopicThunk = (
  topic: CreateTopicProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => async (dispatch) => {
  try {
    const result = await ForumAPI.createTopic(topic);
    dispatch(createTopicAction(result));
  } catch (error) {
    dispatch(showSnackBarAction({ type: 'error', msg: 'Error' }));
  }
};

export const deleteTopicThunk = (
  id: TopicId,
): ThunkAction<void, StoreProps, unknown, Action<string>> => async (dispatch) => {
  try {
    await ForumAPI.deleteTopic(id);
    dispatch(deleteTopicAction(id));
  } catch (error) {
    dispatch(showSnackBarAction({ type: 'error', msg: 'Error' }));
  }
};
