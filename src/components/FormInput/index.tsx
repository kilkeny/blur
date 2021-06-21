import React, { FC } from 'react';
import { TextField } from '@material-ui/core';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { defaultInputs } from './data/defaultInputs.data';
import { DefaultInputsNamesEnum } from './FormInput.types';

interface FormInputProps {
  inputName: DefaultInputsNamesEnum,
  control: Control<FieldValues>
}

export const FormInput: FC<FormInputProps> = ({ inputName, control }) => {
  const inputInfo = defaultInputs[inputName];
  const { name, label, type, rules } = inputInfo;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      // @ts-ignore
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          label={label}
          type={type}
          value={value}
          helperText={error?.message}
          onChange={onChange}
          fullWidth
        />
        )}
    />
  );
};
