import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Logo } from '@components/Logo';
import { ROUTES } from '@components/Routing/Routing.data';
import { LinkComponent } from '@components/LinkComponent';

export const Header: FC = () => {
  const routes = [ROUTES.forum, ROUTES.leaderboard, ROUTES.profile];

  const links = routes.map((route) => (
    <LinkComponent key={route.path} route={route} />
  ));

  return (
    <Box component="header" position="relative" display="flex" alignItems="center" justifyContent="space-between" height={193}>
      <Logo />
      <Typography color="primary" variant="h6">blur</Typography>
      <Box width="25%" display="flex" justifyContent="space-between">
        {links}
      </Box>
    </Box>
  );
};
