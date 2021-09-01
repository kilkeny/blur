import React, { FC } from 'react';
import { Typography, makeStyles, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { RouteType } from '@components/Routing/Routing.types';
// У вас где-то компоненты лежат в Component.ts, с экспортом из index.ts
// а где-то лежат прям в index.ts
// было бы неплохо выдержать единый стиль

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.primary.main,
  },
}));

type LinkingProps = { route: RouteType };

export const LinkComponent: FC<LinkingProps> = ({ route }) => {
  const classes = useStyles();
  return (
    <Link to={route.path} className={classes.root}>
      <Typography color="primary">{route.name}</Typography>
    </Link>
  );
};
