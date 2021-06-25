import React, { FC, memo } from 'react';
import { Avatar as MaterialAvatar } from '@material-ui/core';
import { AvatarPlaceholderIcon } from './icons/AvatarPlaceholderIcon';

interface AvatarProps {
  src?: string;
  radius: string;
}

export const Avatar: FC<AvatarProps> = memo(({ src, radius }) => (
  <MaterialAvatar
    alt="avatar"
    sizes={radius}
    src={src}
  >
    <AvatarPlaceholderIcon />
  </MaterialAvatar>
));
