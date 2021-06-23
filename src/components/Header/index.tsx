import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Logo } from '@components/Logo';
import { LinkType, PathEnum } from '@components/Routing/Routing.types';
import { makeLinks } from '../../utils/makeLinks';

export const Header: FC = () => {
  const links: LinkType[] = [
    {
      name: 'forum',
      path: PathEnum.FORUM,
    },
    {
      name: 'leaderboard',
      path: PathEnum.LEADERBOARD,
    },
    {
      name: 'profile',
      path: PathEnum.PROFILE,
    },
  ];

  return (
    <Box component="header" position="relative" display="flex" alignItems="center" justifyContent="space-between" height={193}>
      <Logo />
      <Typography color="primary" variant="h6">blur</Typography>
      <Box width="25%" display="flex" justifyContent="space-between">
        {makeLinks(links)}
      </Box>
    </Box>
  );
};
