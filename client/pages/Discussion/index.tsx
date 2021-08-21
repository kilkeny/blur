import React, { FC, memo } from 'react';
import { Paper, Box, Typography, Button } from '@material-ui/core';
import { Message, MessageEnum } from '@components/Message';
import { withAuth } from '@core/HOKs/withAuth';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormInput } from 'client/components/FormInput';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { profileSelector } from '@core/store';
import { discussionData } from './discussion.mock';
import { topicData } from '../Forum/forum.mock';

export const WrapperDiscussion: FC = memo(() => {
  const { id } = useParams<{ id: string }>();
  const mockTopic = topicData.find((topic) => topic.id === id) || topicData[0];

  const { handleSubmit, control, reset } = useForm();

  const onSubmit = ({ comment }: { [key: string]: string }) => {
    const profile = useSelector(profileSelector);
    const commentDate = new Date().toLocaleDateString('en-gb');
    const newComment = {
      id: uuid(),
      comment,
      author: profile.display_name,
      date: commentDate,
    };

    // TODO: убрать когда появится бекенд
    console.log(newComment);
    reset();
  };

  return (
    <Paper elevation={22}>
      <Box px="53px" py="46px" width="580px">
        <Typography variant="body1">{mockTopic.date}</Typography>
        <Box my="33px" height="118px">
          <Typography variant="h6">{mockTopic.title}</Typography>
          <Typography variant="body1">{mockTopic.text}</Typography>
        </Box>
        <Typography variant="body1">created by {mockTopic.author}</Typography>
      </Box>
      <Box px="100px" py="80px">
        <Box>
          <Message
            type={MessageEnum.Question}
            text={discussionData.text}
            author={discussionData.author}
            date={discussionData.date}
          />
        </Box>
        <Box>
          {discussionData.answers.map((answer) => (
            <Message
              key={answer.id}
              type={MessageEnum.Answer}
              text={answer.text}
              author={answer.author}
              date={answer.date}
            />
              ))}
        </Box>
        <form
          name="new_comment_form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box display="flex">
            <FormInput
              inputName="text"
              control={control}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              comment
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
  );
});

export const Discussion = withAuth(WrapperDiscussion);
