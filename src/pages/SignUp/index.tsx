import React, { useState } from 'react';
import { Box, Button, Paper } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import {
  FormInput,
  FormInputs,
  NameInput,
} from '@components/FormInput';
import { ROUTES } from '@components/Routing/Routing.data';
import { LinkComponent } from '@components/LinkComponent';
import { Redirect } from 'react-router';
import { AuthAPI } from '@core/api';

export const SignUp = () => {
  const api = new AuthAPI();
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

  const [isRegistred, setRegistred] = useState(false);

  const onSubmit = async (data: FormInputs) => {
    const res = await api.signup(data);
    if (res && res.ok) {
      setRegistred(true);
    }
  };

  return (
    <Box maxWidth="766px">
      {isRegistred && <Redirect to="/signin" />}
      <Paper elevation={22} square={false}>
        <Box px="72px" minHeight="580px">
          <form name="sign_up" onSubmit={handleSubmit(onSubmit)}>
            <Box pt="114px">
              {inputControl}
            </Box>
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
