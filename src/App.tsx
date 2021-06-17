import React, { FC, memo } from 'react';
<<<<<<< HEAD
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { Routing } from '@components/Routing';
import { ROUTES } from '@components/Routing/Routing.data';
import { BrowserRouter as Router } from 'react-router-dom';
import { globalThemeOverride } from './globalThemeOverride';

export const App: FC = memo(() => {
  const routing = Routing(ROUTES);

  return (
    <ThemeProvider theme={globalThemeOverride}>
      <CssBaseline />
      <Container fixed maxWidth={false}>
        <Router>
          {routing}
        </Router>
      </Container>
    </ThemeProvider>
  );
});
=======
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
>>>>>>> 5dd8ed8 (BL-7 Подключить роутинг и для теста сделать заготовку страницы пользователя)
