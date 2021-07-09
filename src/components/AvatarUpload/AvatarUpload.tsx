import React, { FC, memo } from 'react';
import { Avatar, InputProps } from '@material-ui/core';

export interface InputAvatarProps extends InputProps {
  name: string;
  src?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AvatarUploadComponent: FC<InputAvatarProps> = memo(
  ({ name, src, onChange }) => (
    <label htmlFor={`upload_${name}`} className="upload-avatar">
      <input
        id={`upload_${name}`}
        name={name}
        onChange={onChange}
        type="file"
      />
      <Avatar src={src}>re</Avatar>
    </label>
  ),
);

export const AvatarUpload = React.memo(AvatarUploadComponent);
