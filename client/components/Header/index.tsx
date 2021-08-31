import React, { FC, useEffect } from 'react';
import { Box, IconButton, Typography, useTheme } from '@material-ui/core';
import { Logo } from '@components/Logo';
import { ROUTES } from '@components/Routing/Routing.data';
import { LinkComponent } from '@components/LinkComponent';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, themeSelector } from 'client/core/store';
import { changeTypeThemeThunk } from 'client/core/store/actions/theme.actions';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

export const Header: FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { type } = useSelector(themeSelector);
  const { isAuth } = useSelector(authSelector);

  const routes = [
    ROUTES.game,
    ROUTES.forum,
    ROUTES.leaderboard,
    ROUTES.profile,
  ];
  const links = routes.map((route) => (
    <LinkComponent key={route.path} route={route} />
  ));

  const handleChangeTypeTheme = () => dispatch(
    changeTypeThemeThunk({ type: type === 'dark' ? 'light' : 'dark' }),
  );

  useEffect(() => {
    if ('AmbientLightSensor' in window) {
      // @ts-ignore
      const sensor = new AmbientLightSensor();
      sensor.start();

      sensor.addEventListener('reading', () => {
        if (sensor.illuminance <= 50) {
          dispatch(changeTypeThemeThunk({ type: 'dark' }));
        } else {
          dispatch(changeTypeThemeThunk({ type: 'light' }));
        }
      });
    }
  }, []);

  return (
    <Box
      component="header"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height={193}
    >
      <Logo color={theme.palette.primary.main} />
      <Typography color="primary" variant="h6">
        blur
      </Typography>
      <Box width={isAuth ? '25%' : ''} display="flex" justifyContent="space-between">
        {isAuth ? links : null}
        <IconButton onClick={handleChangeTypeTheme} size="small">
          {type === 'light' ? (
            <Brightness2Icon fontSize="inherit" />
                    ) : (
                      <WbSunnyIcon fontSize="inherit" />
                    )}
        </IconButton>
      </Box>
    </Box>
  );
};
