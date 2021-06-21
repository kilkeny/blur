import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Link, Paper } from '@material-ui/core';
import { FormInput } from '../../components/FormInput';
import { DefaultInputsNamesEnum, FormData } from '../../components/FormInput/FormInput.types';

export const Login = () => {
  const { handleSubmit, control } = useForm();
  const { Login: LoginInput, Password } = DefaultInputsNamesEnum;
  const inputs: DefaultInputsNamesEnum[] = [LoginInput, Password];
  const onSubmit = (data: FormData) => console.log(data);

  const inputControl = inputs.map((inputName) => (
    <FormInput
      {...{ inputName, control }}
      key={inputName}
    />
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
              <Link href="signup">Зарегистрироваться</Link>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};
