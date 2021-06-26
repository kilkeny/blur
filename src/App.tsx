import React, { FC, memo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
<<<<<<< HEAD
import { Routing } from '@components/Routing';
import { BrowserRouter as Router } from 'react-router-dom';
=======
import { Header } from '@components/Header';
import { Game } from '@pages/Game';
>>>>>>> dev
import { globalThemeOverride } from './globalThemeOverride';

export const App: FC = memo(() => (
  <ThemeProvider theme={globalThemeOverride}>
    <CssBaseline />
    <Container fixed maxWidth={false}>
<<<<<<< HEAD
      <Router>
        <Routing />
      </Router>
=======
      <Header />
      <Game />
>>>>>>> dev
    </Container>
  </ThemeProvider>
));
