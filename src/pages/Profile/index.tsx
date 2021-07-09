import React, { FC, memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Paper, Button } from '@material-ui/core';
import { PageHeader } from '@components/PageHeader';
import { FormInputs, NameInput, FormInput } from '@components/FormInput';
import {
  thunkGetUser,
  thunkUpdateUser,
  thunkUpdateAvatar,
} from '@core/store/actions';
import { store, userSelector } from '@core/store';
import { useDispatch, useSelector } from 'react-redux';
import { AvatarUpload } from '@components/AvatarUpload';
import { useStyles } from './styles';

export const Profile: FC = memo(() => {
  const classes = useStyles();

  const profile = useSelector(userSelector);
  const dispatch = useDispatch();
  const {
    handleSubmit: updateProfile,
    control: profileControl,
    reset,
  } = useForm();

  useEffect(() => {
    reset(profile);
  }, [profile]);

  useEffect(() => {
    dispatch(thunkGetUser());
  }, []);

  const inputNames: NameInput[] = [
    'first_name',
    'second_name',
    'display_name',
    'login',
    'email',
    'phone',
  ];

  // @ts-ignore
  const onSubmitProfile = (data: FormInputs) => store.dispatch(thunkUpdateUser(data));
  // @ts-ignore
  const onSubmitAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    const blob = files?.item(0);
    if (!blob) return;
    const formData = new FormData();
    formData.append('avatar', blob);
    console.log(formData, files, blob);
    dispatch(thunkUpdateAvatar(formData));
  };

  const inputControl = inputNames.map((inputName) => (
    <FormInput
      key={inputName}
      className={classes.field}
      inputName={inputName}
      control={profileControl}
    />
  ));

  return (
    <>
      <PageHeader title="profile" />
      <div className={classes.layout}>
        <AvatarUpload name="avatar" onChange={onSubmitAvatar} />
        <Paper elevation={22} className={classes.right}>
          <form
            name="profile_form"
            onSubmit={updateProfile(onSubmitProfile)}
          >
            <div className={classes.inputs}>{inputControl}</div>
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
            >
              save
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
});
