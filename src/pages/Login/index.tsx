import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Paper } from '@material-ui/core';
import { FormData, NameInput, FormInput } from '@components/FormInput';
import { PathEnum } from '@components/Routing/Routing.types';
import { makeLinks } from '../../utils/makeLinks';

export const Login = () => {
  const { handleSubmit, control } = useForm();

  const inputNames: NameInput[] = ['login', 'password'];
  const onSubmit = (data: FormData) => console.log(data);

  const inputControl = inputNames.map((inputName) => (
    <FormInput {...{ inputName, control }} key={inputName} />
  ));

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
                Войти
              </Button>
              {makeLinks({ name: 'sign up', path: PathEnum.SIGN_UP })}
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};
