import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from '@components/Header';
import { ROUTES } from './Routing.data';

export const Routing: FC = () => {
  const pages = Object.values(ROUTES).map(({ path, component: Page }) => (
    <Route key={path} path={path} exact>
      <Header />
      <Page />
    </Route>
  ));
  return <Switch>{pages}</Switch>;
};
