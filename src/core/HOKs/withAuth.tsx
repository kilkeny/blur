import React, { useEffect } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { ROUTES } from '@components/Routing';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileThunk, authSelector } from '../store';

export function withAuth<T = any>(Component: React.FC<T>) {
  const WrappedComponent: React.FC<T> = (props) => {
    const dispatch = useDispatch();
    const signRoutes = [ROUTES.signin.path, ROUTES.signup.path];
    const isSignPageThere = signRoutes.some(useRouteMatch);
    const { isAuth } = useSelector(authSelector);

    useEffect(() => {
      if (!isSignPageThere) {
        dispatch(getProfileThunk());
      }
    }, [dispatch]);

    if (!isAuth && !isSignPageThere) {
      return <Redirect to={ROUTES.signin.path} />;
    }
    if (isAuth && isSignPageThere) {
      return <Redirect to={ROUTES.game.path} />;
    }

    return <Component {...props} />;
  };

  return WrappedComponent;
}
