import React, { FC } from 'react';
import { Box, Link, Typography } from '@material-ui/core';
import { Logo } from '@core/components/Logo';
import { routes } from '@core/utils/routes';

export const Header: FC = () => (
  <Box component="header" position="relative" display="flex" alignItems="center" justifyContent="space-between" height={193}>
    <Logo />
    <Typography color="primary" variant="h6">blur</Typography>
    <Box width="25%" display="flex" justifyContent="space-between">
      <Link color="inherit" href={routes.forum.url}><Typography variant="caption">{routes.forum.name}</Typography></Link>
      <Link color="inherit" href={routes.leaderboard.url}><Typography variant="caption">{routes.leaderboard.name}</Typography></Link>
      <Link color="inherit" href={routes.profile.url}><Typography variant="caption">{routes.profile.name}</Typography></Link>
    </Box>
  </Box>
);
