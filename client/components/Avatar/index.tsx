import React, { FC, memo } from 'react';
import { Avatar as MaterialAvatar } from '@material-ui/core';
import { AvatarPlaceholderIcon } from './icons/AvatarPlaceholderIcon';

interface AvatarProps {
  src?: string;
  className?: string;
}

export const Avatar: FC<AvatarProps> = memo(({ children, ...props }) => (
  <MaterialAvatar alt="avatar" {...props}>
    <AvatarPlaceholderIcon />
  </MaterialAvatar>
));
