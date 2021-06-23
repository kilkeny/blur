import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from '@components/Header';
import { GamePainter } from '@components/GameCanvas';
import { RoutesType } from './Routing.types';

export const Routing: FC<RoutesType> = (routes) => {
  const { drawCanvas } = new GamePainter();

  const pages = Object.values(routes).map(({ path, component: Page, hasHeader }) => (
    <Route key={path} path={path} exact>
      { hasHeader && <Header /> }
      {path === '/' ? (
        <Page draw={drawCanvas} />
      ) : (
        <Page />
      )}
    </Route>
  ));
  return <Switch>{pages}</Switch>;
};
