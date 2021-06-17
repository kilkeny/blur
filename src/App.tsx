import React, { FC, memo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserPage } from '@pages/UserPage';

export const App: FC = memo(() => (
  <Router>
    <Switch>
      <Route path="/user">
        <UserPage />
      </Route>
    </Switch>
  </Router>
));
