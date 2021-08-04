import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { FC, memo } from 'react';

export type ColorVariant = 'primary' | 'secondary';

type ThemeColorBall = {
  variant: ColorVariant;
};

export type ColorBallProps = ThemeColorBall & {
  handleChangeColor?: React.MouseEventHandler<SVGSVGElement>;
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: ({ variant }: ThemeColorBall) => ({
    margin: theme.spacing(2),
    cursor: 'pointer',
    '& circle': {
      fill: theme.palette[variant].main,
      transition: '0.5s',
    },
    '&:hover > circle': {
      fill: theme.palette[variant].light,
    },
  }),
}));

export const ColorBall: FC<ColorBallProps> = memo(
  ({ variant = 'primary', handleChangeColor }) => {
    const classes = useStyles({ variant });

    return (
      <svg
        onClick={handleChangeColor}
        width="150"
        height="150"
        viewBox="0 0 150 150"
        className={classes.root}
        id={variant}
      >
        <circle cx="75" cy="75" r="75" fillOpacity="0.05" />
        <circle cx="75" cy="75" r="65" fillOpacity="0.05" />
        <circle cx="75" cy="75" r="55" fillOpacity="0.05" />
        <circle cx="75" cy="75" r="45" fillOpacity="0.05" />
        <circle cx="75" cy="75" r="35" fillOpacity="0.05" />
        <circle cx="75" cy="75" r="25" fillOpacity="0.05" />
        <circle cx="75" cy="75" r="15" fillOpacity="0.05" />
        <circle cx="75" cy="75" r="5" fillOpacity="0.05" />
        <circle cx="75" cy="75" r="75" fillOpacity="0.2" />
        <circle cx="75" cy="75" r="65" fillOpacity="0.25" />
        <circle cx="75" cy="75" r="55" fillOpacity="0.35" />
        <circle cx="75" cy="75" r="45" fillOpacity="0.4" />
        <circle cx="75" cy="75" r="35" fillOpacity="0.45" />
        <circle cx="75" cy="75" r="25" fillOpacity="0.5" />
        <circle cx="75" cy="75" r="15" fillOpacity="0.55" />
        <circle cx="75" cy="75" r="5" />
      </svg>
    );
  },
);
