import React, { FC, memo, useEffect, useState, useMemo } from 'react';
import { Button, Box, Paper } from '@material-ui/core';
import { PageHeader } from '@components/PageHeader';
import { ForumCard } from '@components/ForumCard';
import { withAuth } from '@core/HOKs/withAuth';
import { useDispatch, useSelector } from 'react-redux';
import { allowNotifications, forumSelector, profileSelector } from '@core/store';
import { FormInput, NameInput } from 'client/components/FormInput';
import { useForm } from 'react-hook-form';
import { createTopicThunk, getTopicsThunk } from 'client/core/store/actions';

export const WrapperForum: FC = memo(() => {
  const dispatch = useDispatch();

  const forum = useSelector(forumSelector);
  const { login } = useSelector(profileSelector);

  const [showForm, setShowForm] = useState(false);

  const { handleSubmit, control, reset } = useForm();
  const inputNames: NameInput[] = ['title', 'content'];

  const inputControl = inputNames.map((inputName) => (
    <FormInput
      key={inputName}
      inputName={inputName}
      control={control}
    />
  ));

  useEffect(() => {
    dispatch(getTopicsThunk());

    Notification.requestPermission();
    if (Notification.permission === 'granted') {
      dispatch(allowNotifications());
      // eslint-disable-next-line
      const notification = new Notification(
        'Новые сообщения',
        {
          body: 'У вас 3 непрочитанных сообщения',
          silent: true,
        },
      );
    }
  }, []);

  const onSubmit = ({ title, content }: { [key: string]: string }) => {
    const created = new Date().toLocaleString('ru-RU');
    const data = {
      title,
      content,
      author: login,
      created,
    };
    dispatch(createTopicThunk(data));
    reset();
    setShowForm(false);
  };

  const topicCards = useMemo(() => forum.map((topic) => (
    <Box mb="60px" key={topic.id}>
      <ForumCard
        {...topic}
      />
    </Box>
  )), [forum]);

  return (
    <>
      <PageHeader title="forum">
        <Button variant="text" color="primary" onClick={() => setShowForm(!showForm)}>+ create new topic</Button>
        {showForm && (
          <Paper elevation={22}>
            <Box px="50px" minHeight="260px">
              <form
                name="new_topic_form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Box py="10px">
                  {inputControl}
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  add topic
                </Button>
              </form>
            </Box>
          </Paper>
        )}
      </PageHeader>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {topicCards}
      </Box>
    </>
  );
});

export const Forum = withAuth(WrapperForum);
