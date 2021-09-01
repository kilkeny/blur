import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, Button, Paper } from '@material-ui/core';

import { SigninProps } from '@core/api';
import { getClientIdThunk, oauthSelector, signinThunk } from '@core/store';
import { withAuth } from '@core/HOKs/withAuth';
import { NameInput, FormInput } from '@components/FormInput';
import { LinkComponent } from '@components/LinkComponent';
import { YandexLogo } from '@components/YandexLogo';
import { ROUTES } from '@components/Routing/Routing.data';
// пример компоновки импортов

export const WrapperLogin = () => {
  const { handleSubmit, control } = useForm();

  const dispatch = useDispatch();
  const { callbackURL, oauthURL } = useSelector(oauthSelector);

  const inputNames: NameInput[] = ['login', 'password'];
  const inputControl = inputNames.map((inputName) => (
    <FormInput {...{ inputName, control }} key={inputName} />
  ));

  const onSubmit = (data: SigninProps) => {
    dispatch(signinThunk(data));
  }; // Вот здесь кстати хорошая запись, до этого я видел const onSubmit = (data: SigninProps) => dispatch(signinThunk(data));
  // Лучше писать в едином стиле, и полностью. так же как ифы например. Тем более что здесь функция не должна ничего возвращать

  useEffect(() => {
    dispatch(getClientIdThunk(callbackURL));
  }, []);

  return (
    <Box width="427px">
      <Paper elevation={22}>
        <Box px="72px" minHeight="580px">
          <form name="login_form" onSubmit={handleSubmit(onSubmit)}>
            <Box py="175px">
              {inputControl}
            </Box>
            <Box display="flex" justifyContent="space-around">
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                login
              </Button>
              <LinkComponent route={ROUTES.signup} />
              <Link to={{ pathname: oauthURL }} target="_blank">
                <YandexLogo />
              </Link>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export const Login = withAuth(WrapperLogin);
