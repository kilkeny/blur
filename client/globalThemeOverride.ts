import { PaletteType } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';
import shadows from '@material-ui/core/styles/shadows';

const shadowsOverride = shadows;
shadowsOverride[22] = '0px 9px 46px 8px rgba(0, 0, 0, 0.12)';

export const globalThemeOverride = (type: PaletteType = 'light') => createTheme({
  typography: {
    fontFamily: ['Comfortaa', 'sans-serif'].join(','),
    h3: {
      fontWeight: 700,
      textTransform: 'lowercase',
    },
    h6: {
      fontWeight: 700,
      textTransform: 'lowercase',
    },
    button: {
      fontFamily: ['Comfortaa', 'sans-serif'].join(','),
      textTransform: 'lowercase',
    },
  },
  palette: {
    type,
    primary: {
      main: type === 'light' ? '#4200FF' : lightBlue[300],
    },
  },
  shape: {
    borderRadius: 30,
  },
  shadows: shadowsOverride,
});
