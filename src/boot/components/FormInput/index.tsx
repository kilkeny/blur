import React, { FC } from 'react';
import { TextField } from '@material-ui/core';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { defaultInputs } from './data/defaultInputs.data';
import { InputNameType } from './types/types';

interface FormInputProps {
  inputName: InputNameType,
  control: Control<FieldValues>
}

export const FormInput: FC<FormInputProps> = (props) => {
  const { inputName, control } = props;
  const inputInfo = defaultInputs[inputName];
  const { name, label, type, rules } = inputInfo;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          label={label}
          type={type}
          variant="standard"
          value={value}
          helperText={error ? error.message : null}
          onChange={onChange}
          fullWidth
        />
        )}
    />
  );
};
