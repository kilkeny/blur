import React, { FC, memo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { Routing } from '@components/Routing';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { snackbarSelector } from '@core/store';
import { SnackBar } from '@components/SnackBar';
import { globalThemeOverride } from './globalThemeOverride';

export const App: FC = memo(() => {
  const snackBar = useSelector(snackbarSelector);

  return (
    <ThemeProvider theme={globalThemeOverride}>
      <CssBaseline />
      <SnackBar open={snackBar.isVisible} {...snackBar} />
      <Container fixed maxWidth={false}>
        <Router>
          <Routing />
        </Router>
      </Container>
    </ThemeProvider>
  );
});
