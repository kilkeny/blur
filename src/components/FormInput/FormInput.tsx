import React, { FC } from 'react';
import { TextField } from '@material-ui/core';
import {
  Control,
  Controller,
  RegisterOptions,
} from 'react-hook-form';
import { defaultInputs } from './data/defaultInputs.data';
import { NameInput } from './FormInput.types';

interface FormInputProps {
  inputName: NameInput;
  control?: Control;
  className?: string;
  defaultValue?: string;
}

export const FormInput: FC<FormInputProps> = ({
  inputName,
  control,
  defaultValue,
  className,
}) => {
  const inputInfo = defaultInputs[inputName];
  const { name, label, type, rules } = inputInfo;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules as RegisterOptions}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          className={className}
          label={label}
          type={type}
          value={value || ''}
          helperText={error?.message}
          onChange={onChange}
          fullWidth
        />
            )}
    />
  );
};
