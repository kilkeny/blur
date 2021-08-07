import React, { FC } from 'react';
import { Box, IconButton, Typography, useTheme } from '@material-ui/core';
import { Logo } from '@components/Logo';
import { ROUTES } from '@components/Routing/Routing.data';
import { LinkComponent } from '@components/LinkComponent';
import { useDispatch, useSelector } from 'react-redux';
import { themeSelector } from 'client/core/store';
import { changeTypeThemeThunk } from 'client/core/store/actions/theme.actions';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

export const Header: FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { type } = useSelector(themeSelector);

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
      <Box width="25%" display="flex" justifyContent="space-between">
        {links}
        <IconButton onClick={handleChangeTypeTheme} size="small">
          {type === 'dark' ? (
            <Brightness4Icon fontSize="inherit" />
                    ) : (
                      <Brightness7Icon fontSize="inherit" />
                    )}
        </IconButton>
      </Box>
    </Box>
  );
};
