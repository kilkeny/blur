import React, { FC, memo } from 'react';
import { Avatar as MaterialAvatar } from '@material-ui/core';
import { AvatarPlaceholder } from './AvatarPlaceholder';

interface AvatarProps {
  src?: string;
  radius: number;
}

export const Avatar: FC<AvatarProps> = memo(({ src, radius }) => (
  <MaterialAvatar
    alt="avatar"
    sizes={`${radius}px`}
    src={src}
  >
    <AvatarPlaceholder />
  </MaterialAvatar>
));
