import { clearAuthAction, setAuthAction, setProfileAction, StoreProps } from 'client/core/store';
import { Request } from 'express';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ServerAuthAPI } from 'server/api/auth.api';
import { getHeadersWithCookies } from 'server/server.utils';

export const getCurrentUserInfoThunk = (
  req: Request,
): ThunkAction<void, StoreProps, unknown, Action<string>> => async (dispatch) => {
  try {
    const payload = await ServerAuthAPI.profile({
      headers: getHeadersWithCookies(req),
    });
    dispatch(setProfileAction({ ...payload }));
    dispatch(setAuthAction());
  } catch (error) {
    dispatch(clearAuthAction());
  }
};
