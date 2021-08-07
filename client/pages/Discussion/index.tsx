import React, { FC, memo } from 'react';
import { Paper, Box, Typography } from '@material-ui/core';
import { Message, MessageEnum } from '@components/Message';
import { withAuth } from '@core/HOKs/withAuth';
import { useParams } from 'react-router-dom';
import { discussionData } from './discussion.mock';
import { topicData } from '../Forum/forum.mock';

export const WrapperDiscussion: FC = memo(() => {
  const { id } = useParams<{ id: string }>();
  const mockTopic = topicData.find((topic) => topic.id === id);
  const { date, title, text, author } = mockTopic || topicData[0];

  return (
    <>
      <Paper elevation={22}>
        <Box px="53px" py="46px" width="580px">
          <Typography variant="body1">{date}</Typography>
          <Box my="33px" height="118px">
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1">{text}</Typography>
          </Box>
          <Typography variant="body1">created by {author}</Typography>
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
                type={MessageEnum.Answer}
                text={answer.text}
                author={answer.author}
                date={answer.date}
              />
              ))}
          </Box>
        </Box>
      </Paper>
    </>
  );
});

export const Discussion = withAuth(WrapperDiscussion);
