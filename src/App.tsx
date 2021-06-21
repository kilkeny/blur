import { Canvas, GamePainter } from '@components/GameCanvas';
import React, { FC, memo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { Header } from '@components/Header';
import { Forum } from '@pages/Forum';
import { Discussion } from '@pages/Discussion';
import { globalThemeOverride } from './globalThemeOverride';

export const App: FC = memo(() => {
  const draw = new GamePainter();
  return (
    <ThemeProvider theme={globalThemeOverride}>
      <CssBaseline />
      <Container fixed maxWidth={false}>
        <Header />
        <Forum />
        <Discussion />
        <Canvas draw={draw.drawCanvas} />
      </Container>
    </ThemeProvider>
  );
});
