import React, { FC, memo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { Routing } from '@components/Routing';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@core/store';
import { globalThemeOverride } from './globalThemeOverride';

export const App: FC = memo(() => (
  <Provider store={store}>
    <ThemeProvider theme={globalThemeOverride}>
      <CssBaseline />
      <Container fixed maxWidth={false}>
        <Router>
          <Routing />
        </Router>
      </Container>
    </ThemeProvider>
  </Provider>
));
