import React, { FC, memo } from 'react';
import { Paper, Box, Typography, Button } from '@material-ui/core';
// import { Message } from '@components/Message';
import { withAuth } from '@core/HOKs/withAuth';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentThunk, ForumProps, forumSelector, profileSelector } from 'client/core/store';
import { useForm } from 'react-hook-form';
import { FormInput, NameInput } from 'client/components/FormInput';

export const WrapperDiscussion: FC = memo(() => {
  const dispatch = useDispatch();

  const { login } = useSelector(profileSelector);

  const { id } = useParams<{ id: string }>();

  const forum = useSelector(forumSelector);

  const topics = Object.values(forum) as ForumProps;
  const topic = topics.find((data) => data.id === parseInt(id, 10));

  const { handleSubmit, control, reset } = useForm();

  const inputNames: NameInput[] = ['title', 'content'];

  const inputControl = inputNames.map((inputName) => (
    <FormInput
      key={inputName}
      inputName={inputName}
      control={control}
    />
  ));

  const onSubmit = ({ title, content }: { [key: string]: string }) => {
    const created = new Date().toLocaleString('ru-RU');
    const data = {
      title,
      content,
      author: login,
      comments: [],
      created,
    };
    dispatch(addCommentThunk(data));
    reset();
  };

  if (topic) {
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
            <Box py="175px">
              {inputControl}
            </Box>
            <Box display="flex" justifyContent="space-around">
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                add comment
              </Button>
            </Box>
          </form>
          <Box>
            Hello
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
