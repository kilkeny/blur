import React, { FC } from 'react';
import { Box, Link, Typography } from '@material-ui/core';
import Logo from '@core/components/Logo';

const Header: FC = () => (
  <Box component="header" position="relative" display="flex" alignItems="center" justifyContent="space-between" height={193}>
    <Logo />
    <Typography color="primary" variant="h6">blur</Typography>
    <Box width="25%" display="flex" justifyContent="space-between">
      <Link color="inherit" href="/forum"><Typography variant="caption">forum</Typography></Link>
      <Link color="inherit" href="/leaderboard"><Typography variant="caption">leaderboard</Typography></Link>
      <Link color="inherit" href="/profile"><Typography variant="caption">profile</Typography></Link>
    </Box>
  </Box>
);

export default Header;
