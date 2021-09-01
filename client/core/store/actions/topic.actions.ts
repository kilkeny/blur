import { AddCommentProps, ForumAPI, RemoveCommentProps } from 'client/core/api';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreProps, TopicType } from '../store.types';
import { TOPIC } from './action.types';
import { showSnackBarAction } from './snackbar.actions';

export const setCurrentTopicAction = (payload: TopicType) => ({
  type: TOPIC.SET,
  payload,
});

export const clearCurrentTopicAction = () => ({
  type: TOPIC.CLEAR,
});

export const addCommentAction = (payload: AddCommentProps) => ({
  type: TOPIC.ADD_COMMENT,
  payload,
});

export const removeCommentAction = (payload: RemoveCommentProps) => ({
  type: TOPIC.REMOVE_COMMENT,
  payload,
});

export const getTopicThunk = (
  id: string,
):
ThunkAction<void, StoreProps, unknown, Action<string>> => async (dispatch) => {
  try {
    const result = await ForumAPI.getTopic(id);
    dispatch(setCurrentTopicAction(result));
  } catch (error) {
    dispatch(showSnackBarAction({ type: 'error', msg: 'Error' }));
  }
};

export const addCommentThunk = (
  comment: AddCommentProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => async (dispatch) => {
  try {
    const result = await ForumAPI.addComment(comment);
    dispatch(addCommentAction(result));
  } catch (error) {
    dispatch(showSnackBarAction({ type: 'error', msg: 'Error' }));
  }
};

export const removeCommentThunk = (
  id: RemoveCommentProps,
): ThunkAction<void, StoreProps, unknown, Action<string>> => async (dispatch) => {
  try {
    await ForumAPI.removeComment(id);
    dispatch(removeCommentAction(id));
  } catch (error) {
    dispatch(showSnackBarAction({ type: 'error', msg: 'Error' }));
  }
};
