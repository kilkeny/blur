import React, { ChangeEvent, FC, memo, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Paper, Button, Typography } from '@material-ui/core';
import { PageHeader } from '@components/PageHeader';
import { Avatar } from '@components/Avatar';
import { NameInput, FormInput } from '@components/FormInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  editAvatarProfileThunk,
  editDataProfileThunk,
  logoutThunk,
  profileSelector,
} from '@core/store';
import { withAuth } from '@core/HOKs/withAuth';
import { EditDataProfileProps } from '@core/api';
import { BASE_URL } from '@core/api/api.consts';
import { useStyles } from './styles';

export const WrapperProfile: FC = memo(() => {
  const classes = useStyles();

  const { handleSubmit, control, reset } = useForm();
  const profile = useSelector(profileSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    reset(profile);
  }, [profile]);

  const inputNames: NameInput[] = [
    'first_name',
    'second_name',
    'display_name',
    'login',
    'email',
    'phone',
  ];

  const onSubmitForm = (data: EditDataProfileProps) => dispatch(editDataProfileThunk(data));

  const inputControl = useMemo(
    () => inputNames.map((inputName) => (
      <FormInput
        key={profile[inputName] + inputName}
        className={classes.field}
        defaultValue={profile[inputName]}
        inputName={inputName}
        control={control}
      />
    )),
    [profile],
  );

  const onChangeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const blob = event.target.files?.item(0);

    if (blob) {
      const data = new FormData();
      data.append('avatar', blob);
      dispatch(editAvatarProfileThunk(data));
    }
  };

  const onLogout = () => dispatch(logoutThunk());

  return (
    <>
      <PageHeader title="profile" />
      <div className={classes.layout}>
        <div className={classes.avatarForm}>
          <Avatar
            src={profile.avatar ? `${BASE_URL}/resources${profile.avatar}` : undefined}
            className={classes.avatar}
          />
          <label>
            <Input
              type="file"
              className={classes.hiddenInput}
              onChange={onChangeAvatar}
            />
            <Typography variant="body1" color="primary">
              edit avatar
            </Typography>
          </label>
        </div>
        <Paper elevation={22} className={classes.right}>
          <form
            name="profile_form"
            onSubmit={handleSubmit(onSubmitForm)}
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
            <Button
              onClick={onLogout}
              className={classes.button}
              type="button"
              color="secondary"
            >
              logout
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
});

export const Profile = withAuth(WrapperProfile);
