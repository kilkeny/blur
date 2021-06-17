import React from 'react';
import { ButtonComponent } from '@boot/components/Button';
import { FormInput } from '@boot/components/FormInput';
import { Box, Link, Paper } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { InputNameType } from '@boot/components/FormInput/types/types';
import { v4 as uuidv4 } from 'uuid';

export const SignUp = () => {
  const inputs: InputNameType[] = ['firstName', 'lastName', 'login', 'email', 'phone', 'password'];
  const { handleSubmit, control } = useForm();
  const onSubmit = (data: {}) => console.log(data);

  return (
    <Box maxWidth="766px">
      <Paper elevation={22} square={false}>
        <Box px="72px" minHeight="580px">
          <form name="sign_up" onSubmit={handleSubmit(onSubmit)}>
            <Box pt="114px">
              {
                inputs.map((inputName) => (
                  <FormInput
                    inputName={inputName}
                    control={control}
                    key={uuidv4()}
                  />
                ))
              }
            </Box>
            <Box pt="84px">
              <ButtonComponent text="sign up" />
              <Link href="login">login</Link>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};
