import React from 'react';
import { FormInput } from '@boot/components/FormInput';
import { useForm } from 'react-hook-form';
import { ButtonComponent } from '@boot/components/Button';
import { Box, Link, Paper } from '@material-ui/core';
import { InputNameType } from '@boot/components/FormInput/types/types';
import { v4 as uuidv4 } from 'uuid';

export const Login = () => {
  const { handleSubmit, control } = useForm();
  const inputs: InputNameType[] = ['login', 'password'];
  const onSubmit = (data: {}) => console.log(data);

  return (
    <Box width="427px">
      <Paper elevation={22} square={false}>
        <Box px="72px" minHeight="580px">
          <form name="login_form" onSubmit={handleSubmit(onSubmit)}>
            <Box py="175px">
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
            <Box display="flex" justifyContent="space-around">
              <ButtonComponent text="login" />
              <Link href="signup">sign up</Link>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};
