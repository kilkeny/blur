import React, { FC } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { Logo } from '@components/Logo';
import { ROUTES } from '@components/Routing/Routing.data';
import { LinkComponent } from '@components/LinkComponent';
import { useDispatch, useSelector } from 'react-redux';
import { themeSelector } from 'client/core/store';
import { changeTypeThemeThunk } from 'client/core/store/actions/theme.actions';

export const Header: FC = () => {
  const dispatch = useDispatch();

  const routes = [
    ROUTES.game,
    ROUTES.forum,
    ROUTES.leaderboard,
    ROUTES.profile,
  ];
  const links = routes.map((route) => (
    <LinkComponent key={route.path} route={route} />
  ));

  const { type } = useSelector(themeSelector);

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
      <Logo />
      <Typography color="primary" variant="h6">
        blur
      </Typography>
      <Button color="primary" onClick={handleChangeTypeTheme}>
        Type
      </Button>
      <Box width="25%" display="flex" justifyContent="space-between">
        {links}
      </Box>
    </Box>
  );
};
