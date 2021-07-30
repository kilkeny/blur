import {
  composeStore,
  StoreProps,
} from 'client/core/store';
import { NextFunction, Request, Response } from 'express';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import fetch from 'node-fetch';
import { getCurrentUserInfoThunk } from '../store/actions/auth.actions';
import { defaultState } from '../store/initialState';
import { renderHtml } from './renderHtml';

if (!global.fetch) {
  // @ts-ignore
  global.fetch = fetch;
}

export function renderBundle(req: Request, res: Response, next: NextFunction) {
  res.renderBundle = async (url: string) => {
    const store = composeStore(defaultState);
    const dispatch = store.dispatch as ThunkDispatch<StoreProps, void, AnyAction>;

    await dispatch(getCurrentUserInfoThunk(req));

    const state = store.getState();
    const { html } = renderHtml(url, state, store);

    res.send(html);
  };

  next();
}
