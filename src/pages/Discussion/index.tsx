import React, { FC, memo } from 'react';
import { Link, Paper, Box } from '@material-ui/core';
import { PageHeader } from '@components/PageHeader';
import { Message, MessageEnum } from '@components/Message';
import { discussionData } from './discussion.mock';

export const Discussion: FC = memo(() => (
  <>
    <PageHeader title="forum"><Link href="forum">&lt; back to all discussions</Link></PageHeader>
    <Paper elevation={22}>
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
));
