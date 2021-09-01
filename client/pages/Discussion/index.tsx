import React, { FC, memo, useMemo, useEffect } from 'react';
import { Paper, Box, Typography, Button } from '@material-ui/core';
import { Message } from '@components/Message';
import { withAuth } from '@core/HOKs/withAuth';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCommentThunk,
  currentTopicSelector,
  getTopicThunk,
  profileSelector,
} from 'client/core/store';
import { useForm } from 'react-hook-form';
import { FormInput, NameInput } from 'client/components/FormInput';

export const WrapperDiscussion: FC = memo(() => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const { login } = useSelector(profileSelector);
  const topic = useSelector(currentTopicSelector);

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

  useEffect(() => {
    dispatch(getTopicThunk(id));
  }, []);

  const commentsCards = useMemo(() => {
    if (topic && topic.comments) {
      return (
        topic.comments.map((item) => (
          <Box mb="10px" key={topic.id}>
            <Message
              {...item}
            />
          </Box>
        ))
      );
    }
  }, [topic]);

  return (
    <>
      <Paper elevation={22}>
        <Box px="53px" py="46px" width="580px" mb="20px">
          <Typography variant="body1">{topic.created}</Typography>
          <Box my="33px" height="118px">
            <Typography variant="h6">{topic.title}</Typography>
            <Typography variant="body1">{topic.content}</Typography>
          </Box>
          <Typography variant="body1">created by {topic.author}</Typography>
        </Box>
      </Paper>
      <Paper elevation={22}>
        <Box px="100px" py="80px">
          <form
            name="add_comment_form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box py="10px">
              {inputControl}
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              data-id={id}
            >
              add comment
            </Button>
          </form>
          <Box mt="20px">
            {commentsCards}
          </Box>
        </Box>
      </Paper>
    </>
  );
});

export const Discussion = withAuth(WrapperDiscussion);
