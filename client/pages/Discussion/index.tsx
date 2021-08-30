import React, { FC, memo, useMemo } from 'react';
import { Paper, Box, Typography, Button } from '@material-ui/core';
import { Message } from '@components/Message';
import { withAuth } from '@core/HOKs/withAuth';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentThunk, forumSelector, profileSelector } from 'client/core/store';
import { useForm } from 'react-hook-form';
import { FormInput, NameInput } from 'client/components/FormInput';

export const WrapperDiscussion: FC = memo(() => {
  const dispatch = useDispatch();

  const { login } = useSelector(profileSelector);
  const forum = useSelector(forumSelector);

  const { id } = useParams<{ id: string }>();

  const topic = forum.find((item) => item.id === parseInt(id, 10));

  const { handleSubmit, control, reset } = useForm();

  const inputNames: NameInput[] = ['content'];

  const inputControl = inputNames.map((inputName) => (
    <FormInput
      key={inputName}
      inputName={inputName}
      control={control}
    />
  ));

  const onSubmit = ({ content }: { [key: string]: string }) => {
    const created = new Date().toLocaleString('ru-RU');
    const data = {
      topicid: parseInt(id, 10),
      content,
      author: login,
      created,
    };
    dispatch(addCommentThunk(data));
    reset();
  };

  if (topic) {
    const commentsCards = useMemo(() => topic.comments.map((item) => (
      <Box mb="10px" key={topic.id}>
        <Message
          {...item}
        />
      </Box>
    )), [forum]);

    const { created, title, content, author } = topic;
    return (
      <Paper elevation={22}>
        <Box px="53px" py="46px" width="580px">
          <Typography variant="body1">{created}</Typography>
          <Box my="33px" height="118px">
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1">{content}</Typography>
          </Box>
          <Typography variant="body1">created by {author}</Typography>
        </Box>
        <Box px="100px" py="80px">
          <form
            name="add_comment_form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box py="10px">
              {inputControl}
            </Box>
            <Box display="flex" justifyContent="space-around" pb="10px">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                data-id={id}
              >
                add comment
              </Button>
            </Box>
          </form>
          <Box>
            {commentsCards}
          </Box>
        </Box>
      </Paper>
    );
  }
  return (
    <Typography variant="h6">Что-то пошло не так</Typography>
  );
});

export const Discussion = withAuth(WrapperDiscussion);
