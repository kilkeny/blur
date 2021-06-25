import React, { FC, memo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { Header } from '@components/Header';
import { Profile } from '@pages/Profile';
import { globalThemeOverride } from './globalThemeOverride';

export const App: FC = memo(() => (
  <ThemeProvider theme={globalThemeOverride}>
    <CssBaseline />
    <Container fixed maxWidth={false}>
      <Header />
      <Profile />
    </Container>
  </ThemeProvider>
));
