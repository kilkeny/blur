import React, { FC } from 'react';
import { Button } from '@material-ui/core';

interface ButtonProps {
  text: string
}

export const ButtonComponent: FC<ButtonProps> = (props) => {
  const { text } = props;
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
    >
      {text}
    </Button>
  );
};
