import React, { FC, memo } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Paper, Button, Typography } from '@material-ui/core';
import { PageHeader } from '@components/PageHeader';
import { Avatar } from '@components/Avatar';
import { FormInputs, NameInput, FormInput } from '@components/FormInput';
import { profileData } from './profile.mock';
import { useStyles } from './styles';

export const Profile: FC = memo(() => {
  const classes = useStyles();

  const { handleSubmit, control } = useForm();

  const inputNames: NameInput[] = [
    'first_name',
    'second_name',
    'login',
    'email',
    'phone',
    'password',
  ];

  const onSubmitAvatar = (data: { avatar: string }) => console.log(data);
  const onSubmitForm = (data: FormInputs) => console.log(data);

  const inputControl = inputNames.map((inputName) => (
    <FormInput
      key={inputName}
      className={classes.field}
      defaultValue={profileData[inputName]}
      inputName={inputName}
      control={control}
    />
  ));

  return (
    <>
      <PageHeader title="profile" />
      <div className={classes.layout}>
        <form className={classes.avatarForm} name="avatar_form" onSubmit={handleSubmit(onSubmitAvatar)}>
          <Avatar src={profileData.avatar} className={classes.avatar} />
          <label>
            <Input type="file" className={classes.hiddenInput} />
            <Typography variant="body1" color="primary">edit avatar</Typography>
          </label>
        </form>
        <Paper elevation={22} className={classes.right}>
          <form name="profile_form" onSubmit={handleSubmit(onSubmitForm)}>
            <div className={classes.inputs}>
              {inputControl}
            </div>
            <Button className={classes.button} type="submit" variant="contained" color="primary">save</Button>
          </form>
        </Paper>
      </div>
    </>
  );
});
