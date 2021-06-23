import React from 'react';
import { Box, Button, Paper } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import {
  FormInput,
  NameInput,
} from '@components/FormInput';
import { PathEnum } from '@components/Routing/Routing.types';
import { makeLinks } from '../../utils/makeLinks';

export const SignUp = () => {
  const inputNames: NameInput[] = [
    'first_name',
    'second_name',
    'login',
    'email',
    'phone',
    'password',
  ];

  const { handleSubmit, control } = useForm();
  const onSubmit = (data: FormData) => console.log(data);

  const inputControl = inputNames.map((inputName) => (
    <FormInput {...{ inputName, control }} key={inputName} />
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
              {makeLinks({ name: 'login', path: PathEnum.LOGIN })}
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};
