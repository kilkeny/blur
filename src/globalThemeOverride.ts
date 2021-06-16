import { createMuiTheme } from '@material-ui/core/styles';
import shadows from '@material-ui/core/styles/shadows';

const shadowsOverride = shadows;
shadowsOverride[22] = '0px 9px 46px 8px rgba(0, 0, 0, 0.12)';

export const globalThemeOverride = createMuiTheme({
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
        primary: {
            main: '#4200FF',
        },
        background: {
            default: '#FFFFFF',
        },
    },
    shape: {
        borderRadius: 30,
    },
    shadows: shadowsOverride,
    overrides: {
        MuiGridList: {
            root: {
                overflowY: 'unset',
            },
        },
    },
});
