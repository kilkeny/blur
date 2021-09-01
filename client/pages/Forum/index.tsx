import React, { FC, memo, useEffect, useState, useMemo } from 'react';
import { Button, Box, Paper } from '@material-ui/core';
import { PageHeader } from '@components/PageHeader';
import { ForumCard } from '@components/ForumCard';
import { withAuth } from '@core/HOKs/withAuth';
import { useDispatch, useSelector } from 'react-redux';
import { allowNotifications, ForumProps, forumSelector, profileSelector } from '@core/store';
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

    Notification.requestPermission(); // тут ТС подсказывает, что это промис,
    if (Notification.permission === 'granted') { //  а значит это условие выполнится до того, как промис завершится
      dispatch(allowNotifications());// то есть его нужно убрать в requestPermission().then(permission => ...)
      // eslint-disable-next-line // А так же насколько я правильно понял, нужно сначала дождаться сообщений от сервера
      const notification = new Notification( // то есть нужно авэйтить диспатч санки
        'Новые сообщения',
        {
          body: 'У вас 3 непрочитанных сообщения',
          silent: true,
        },
      );
    }
  }, []);

  const onSubmit = ({ title, content }: { [key: string]: string }) => {  // такие часто встречающиеся интерейсы как { [key: string]: string/any } можно выносить в глобальные и переиспользовать
    const created = new Date().toLocaleString('ru-RU');
    const data = {
      title,
      content,
      author: login,
      comments: [],
      created,
    };
    dispatch(createTopicThunk(data)); // здесь по хорошему тоже нужно авэйтить диспатч, потому что ресет формы будет сразу
    reset(); // независимо от того, прошел запрос успешно или нет. А возможно была ошибка в каком-то поле и нужно ее показать, не очищая поля
    setShowForm(false);
  };

  const topicCards = useMemo(() => {
    const topics = Object.values(forum) as ForumProps;
    return topics.map((topic) => (
      <Box mb="60px" key={topic.id}>
        <ForumCard
          {...topic}
        />
      </Box>
    ));
  }, [forum]);

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
        {topicCards}
      </Box>
    </>
  );
});

export const Forum = withAuth(WrapperForum);
