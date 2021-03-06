import React from 'react';
import { Box, Button, Paper } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { FormInput, NameInput } from '@components/FormInput';
import { ROUTES } from '@components/Routing/Routing.data';
import { LinkComponent } from '@components/LinkComponent';
import { SignupProps } from '@core/api';
import { withAuth } from '@core/HOKs/withAuth';
import { signupThunk } from '@core/store';
import { useDispatch } from 'react-redux';

export const WrapperSignUp = () => {
  const dispatch = useDispatch();

  const inputNames: NameInput[] = [
    'first_name',
    'second_name',
    'login',
    'email',
    'phone',
    'password',
  ];

  const { handleSubmit, control } = useForm();
  const inputControl = inputNames.map((inputName) => (
    <FormInput {...{ inputName, control }} key={inputName} />
  ));

  const onSubmit = (data: SignupProps) => {
    dispatch(signupThunk(data));
  };

  return (
    <Box maxWidth="766px">
      <Paper elevation={22} square={false}>
        <Box px="72px" minHeight="580px">
          <form name="sign_up" onSubmit={handleSubmit(onSubmit)}>
            <Box pt="114px">{inputControl}</Box>
            <Box pt="84px">
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                sign up
              </Button>
              <LinkComponent route={ROUTES.signin} />
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export const SignUp = withAuth(WrapperSignUp);
