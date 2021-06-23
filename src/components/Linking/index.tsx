import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { RouteType } from '@components/Routing/Routing.types';

type LinkingProps = { routes: RouteType[] | RouteType };

export const Linking: FC<LinkingProps> = ({ routes }) => {
  if (!Array.isArray(routes)) {
    const { path, name } = routes;
    return (<Link to={path}><Typography>{name}</Typography></Link>);
  }

  const links = routes.map(({ name, path }) => (
    <Link key={path} to={path}><Typography>{name}</Typography></Link>
  ));

  return (
    <>
      {links}
    </>
  );
};
