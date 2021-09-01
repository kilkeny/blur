import React, { FC } from 'react';
import { TextField } from '@material-ui/core';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { defaultInputs } from './data/defaultInputs.data';
import { NameInput } from './FormInput.types';

interface FormInputProps {
  inputName: NameInput;
  control: Control<FieldValues>;
  className?: string;
  defaultValue? :string;
}

export const FormInput: FC<FormInputProps> = ({
  inputName, control, className, defaultValue,
}) => {
  const inputInfo = defaultInputs[inputName];
  const { name, label, type, rules, multiline } = inputInfo;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules as RegisterOptions} // про это я писал в другом комменте...
      render={({ field: { onChange, value = '' }, fieldState: { error } }) => ( // дефолтное значение можно указать здесь.
        /*
          Плюс тут можно более развернуто написать, для лучшей читаемости
          ({ field, fieldState }) => {
            const { onChange, value = '' } = field;
            const { error } = fieldState;
            return (
              <TextField
         */
        <TextField
          className={className}
          label={label}
          multiline={multiline}
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
