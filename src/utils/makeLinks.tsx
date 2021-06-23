import React from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { LinkType } from '@components/Routing/Routing.types';

export const makeLinks = (linksInfo: LinkType[] | LinkType) => {
  if (!Array.isArray(linksInfo)) {
    const { path, name } = linksInfo;
    return (<Link to={path}><Typography>{name}</Typography></Link>);
  }

  const links = linksInfo.map(({ name, path }) => (
    <Link to={path}><Typography>{name}</Typography></Link>
  ));

  return links;
};
