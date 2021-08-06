import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Paper } from '@material-ui/core';
import { NameInput, FormInput } from '@components/FormInput';
import { ROUTES } from '@components/Routing/Routing.data';
import { LinkComponent } from '@components/LinkComponent';

import { SigninProps } from '@core/api';
import { useDispatch, useSelector } from 'react-redux';
import { getClientIdThunk, oauthSelector, signinThunk } from '@core/store';
import { withAuth } from '@core/HOKs/withAuth';
import { YandexLogo } from '@components/YandexLogo';
import { Link } from 'react-router-dom';

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
  };

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
