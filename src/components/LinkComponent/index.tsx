import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { RouteType } from '@components/Routing/Routing.types';

type LinkingProps = { route: RouteType };

export const LinkComponent: FC<LinkingProps> = ({ route }) => (
  <Link to={route.path}><Typography>{route.name}</Typography></Link>
);
