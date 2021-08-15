import React, { FC, memo, useEffect, useState } from 'react';
import { Button, Box, Paper } from '@material-ui/core';
import { PageHeader } from '@components/PageHeader';
import { ForumCard } from '@components/ForumCard';
import { withAuth } from '@core/HOKs/withAuth';
import { useDispatch } from 'react-redux';
import { allowNotifications } from '@core/store';
import { FormInput, NameInput } from 'client/components/FormInput';
import { useForm } from 'react-hook-form';
import { createTopicThunk } from 'client/core/store/actions/forum.actions';
import { topicData } from './forum.mock';

export const WrapperForum: FC = memo(() => {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [topics, setTopics] = useState(topicData);

  const { handleSubmit, control, reset } = useForm();
  const inputNames: NameInput[] = ['title', 'text'];

  const inputControl = inputNames.map((inputName) => (
    <FormInput
      key={inputName}
      inputName={inputName}
      control={control}
    />
  ));

  const onSubmit = ({ title, text }: { [key: string]: string }) => {
    const date = new Date().toLocaleDateString('en-gb');
    const newCard = {
      id: Date.now().toString(),
      title,
      text,
      author: 'username',
      date,
      answers: 10,
    };
    setTopics([...topics, newCard]);
    dispatch(createTopicThunk(newCard));
    reset();
    setShowForm(false);
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget as HTMLElement;
    const targetId = target.dataset.id;
    const filteredTopics = topics.filter((el) => el.id !== targetId);
    setTopics(filteredTopics);
    e.stopPropagation();
  };

  useEffect(() => {
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

  return (
    <>
      <PageHeader title="forum">
        <Button variant="text" color="primary" onClick={() => setShowForm(!showForm)}>+ create new topic</Button>
        {showForm && (
          <Paper elevation={22}>
            <Box px="50px" minHeight="580px">
              <form
                name="new_topic_form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Box py="175px">
                  {inputControl}
                </Box>
                <Box display="flex" justifyContent="space-around">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    add topic
                  </Button>
                </Box>
              </form>
            </Box>
          </Paper>
        )}
      </PageHeader>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {topics.map((topic) => (
          <Box mb="60px" key={topic.id}>
            <ForumCard
              {...topic}
              handleDelete={handleDelete}
            />
          </Box>
        ))}
      </Box>
    </>
  );
});

export const Forum = withAuth(WrapperForum);
