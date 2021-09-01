import React, { FC, useEffect } from 'react';
import { Box, IconButton, Typography, useTheme } from '@material-ui/core';
import { Logo } from '@components/Logo';
import { ROUTES } from '@components/Routing/Routing.data';
import { LinkComponent } from '@components/LinkComponent';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, themeSelector } from 'client/core/store';
import { changeTypeThemeThunk } from 'client/core/store/actions/theme.actions';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
// Для лучшей читаемости лучше упорядочивать импорты (сначала идут импорты из node_modules, потом из своих,
// некоторые люди еще ставят между ними перевод строки)
// В самом конце могут идти импорты из текущей папки './'

export const Header: FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { type } = useSelector(themeSelector);
  const { isAuth } = useSelector(authSelector);

  const routes = [
    ROUTES.game,
    ROUTES.forum,
    ROUTES.leaderboard,
    ROUTES.profile,
  ];
  const links = routes.map((route) => (
    <LinkComponent key={route.path} route={route} />
  ));

  const handleChangeTypeTheme = () => dispatch(
    changeTypeThemeThunk({ type: type === 'dark' ? 'light' : 'dark' }), // Лучше оперировать не текстовыми наименованиями,
     // а константами/enum с этими самыми текстовыми наименованиями. Это дает подсказки в коде, меньше шанс допустить ошибки,
    // а так же это задел на масштабируемость
  );

  const updateThemeOnSensor = (event: Event) => {
    const sensor = event.target;
    if ((sensor as any).illuminance <= 50) {
      dispatch(changeTypeThemeThunk({ type: 'dark' }));
    } else {
      dispatch(changeTypeThemeThunk({ type: 'light' }));
    }
  };

  useEffect(() => {
    if ('AmbientLightSensor' in window) {
      // @ts-ignore
      const sensor = new AmbientLightSensor();

      sensor.addEventListener('reading', updateThemeOnSensor);
      sensor.start();

      return function cleanup() {
        sensor.removeEventListener('reading', updateThemeOnSensor);
        sensor.stop();
      };
    }
  }, []);

  return (
    <Box
      component="header"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height={193}
    >
      <Logo color={theme.palette.primary.main} />
      <Typography color="primary" variant="h6">
        blur
      </Typography>
      <Box width={isAuth ? '25%' : ''} display="flex" justifyContent="space-between">
        {isAuth ? links : null} // Можно сократить до {isAuth && links}
        <IconButton onClick={handleChangeTypeTheme} size="small">
          {type === 'light' ? (
            <Brightness2Icon fontSize="inherit" />
                    ) : (
                      <WbSunnyIcon fontSize="inherit" /> // оступы
                    )}
        </IconButton>
      </Box>
    </Box>
  );
};
