import React, { FC, memo } from 'react';
import { Paper, Box, Typography } from '@material-ui/core';
import { Message, MessageEnum } from '@components/Message';
import { withAuth } from '@core/HOKs/withAuth';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ForumProps, forumSelector } from 'client/core/store';
import { discussionData } from './discussion.mock';

export const WrapperDiscussion: FC = memo(() => {
  const { id } = useParams<{ id: string }>();

  const forum = useSelector(forumSelector);

  const topics = Object.values(forum) as ForumProps; // А зачем в селекторе деструктуризация массива в объект? Она там точно нужна?
  // там же всеравно в индексах будут не айдишники а числа от 0 и выше.
  // Если была задумка сделать нормализацию данных то
  // можно обратить внимание на https://github.com/paularmstrong/normalizr
  const topic = topics.find((data) => data.id === parseInt(id, 10));

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
          <Box>
            <Message
              type={MessageEnum.Question}
              {...discussionData}
            />
          </Box>
          <Box>
            {discussionData.answers.map((answer) => (
              <Message
                type={MessageEnum.Answer}
                {...answer}
              />
            ))} // отступ поехал
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
