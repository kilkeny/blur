import React from 'react';
import { Box, Button, Link, Paper } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../components/FormInput';
import { DefaultInputsNamesEnum } from '../../components/FormInput/FormInput.types';

export const SignUp = () => {
  const { Login, FirstName, LastName, Phone, Email, Password } = DefaultInputsNamesEnum;
  const inputs: DefaultInputsNamesEnum[] = [FirstName, LastName, Login, Email, Phone, Password];
  const { handleSubmit, control } = useForm();
  const onSubmit = (data: FormData) => console.log(data);

  const inputControl = inputs.map((inputName) => (
    <FormInput
      {...{ inputName, control }}
      key={inputName}
    />
  ));

  return (
    <Box maxWidth="766px">
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
                Зарегистрироваться
              </Button>
              <Link href="login">Войти</Link>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};
