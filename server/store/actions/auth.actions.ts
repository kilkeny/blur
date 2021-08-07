import { Request } from 'express';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ServerAuthAPI } from 'server/api/auth.api';
import { getHeadersWithCookies } from 'server/server.utils';
import { setAuthAction, clearAuthAction, setProfileAction, StoreProps } from 'client/core/store';

export const serverGetProfileThunk = (
  req: Request,
): ThunkAction<void, StoreProps, unknown, Action<string>> => async (dispatch) => {
  await ServerAuthAPI.profile({
    headers: getHeadersWithCookies(req),
  }).then(async (response) => {
    const payload = await response.json();

    dispatch(setProfileAction({ ...payload }));
    dispatch(setAuthAction());
  })
    .catch(() => {
      dispatch(clearAuthAction());
    });
};
