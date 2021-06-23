import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Logo } from '@components/Logo';
import { ROUTES } from '@components/Routing/Routing.data';
import { Linking } from '@components/Linking';

export const Header: FC = () => {
  const links = [ROUTES.forum, ROUTES.leaderboard, ROUTES.profile];

  return (
    <Box component="header" position="relative" display="flex" alignItems="center" justifyContent="space-between" height={193}>
      <Logo />
      <Typography color="primary" variant="h6">blur</Typography>
      <Box width="25%" display="flex" justifyContent="space-between">
        <Linking routes={links} />
      </Box>
    </Box>
  );
};
