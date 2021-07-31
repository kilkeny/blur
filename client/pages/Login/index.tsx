import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Paper } from '@material-ui/core';
import { NameInput, FormInput } from '@components/FormInput';
import { ROUTES } from '@components/Routing/Routing.data';
import { LinkComponent } from '@components/LinkComponent';

import { SigninProps } from '@core/api';
import { useDispatch } from 'react-redux';
import { signinThunk } from '@core/store';
import { withAuth } from '@core/HOKs/withAuth';

export const WrapperLogin = () => {
  const { handleSubmit, control } = useForm();

  const dispatch = useDispatch();

  const inputNames: NameInput[] = ['login', 'password'];
  const inputControl = inputNames.map((inputName) => (
    <FormInput {...{ inputName, control }} key={inputName} />
  ));

  const onSubmit = (data: SigninProps) => {
    console.log(data);
    dispatch(signinThunk(data));
  };

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
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export const Login = withAuth(WrapperLogin);
