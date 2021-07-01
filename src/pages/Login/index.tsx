import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Paper } from '@material-ui/core';
import { NameInput, FormInput, FormInputs } from '@components/FormInput';
import { ROUTES } from '@components/Routing/Routing.data';
import { LinkComponent } from '@components/LinkComponent';

import { Redirect } from 'react-router';
import { AuthAPI } from '@core/api';

export const Login = () => {
  const { handleSubmit, control } = useForm();
  const inputNames: NameInput[] = ['login', 'password'];
  const inputControl = inputNames.map((inputName) => (
    <FormInput {...{ inputName, control }} key={inputName} />
  ));

  const [isLogged, setLogged] = useState(false);
  const api = new AuthAPI();

  const onSubmit = async (data: FormInputs) => {
    const res = await api.signin(data);
    if (res && res.ok) {
      setLogged(true);
    }
  };

  return (
    <Box width="427px">
      {isLogged && <Redirect to="/" />}
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
