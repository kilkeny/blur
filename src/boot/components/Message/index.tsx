import React, { FC, memo } from 'react';
import { Typography, Box } from '@material-ui/core';

export enum MessageEnum {
    Question = 'asks',
    Answer = 'answers',
}

interface MessageProps {
    type: MessageEnum;
    text: string;
    author: string;
    date: string;
}

const Message: FC<MessageProps> = memo(({ type, text, author, date }) => (
  <Box mb={type === MessageEnum.Question ? '40px' : '10px'}>
    <Typography variant="body1" gutterBottom color="textSecondary">
      {author}
      {' '}
      {type}
      {' '}
      on
      {' '}
      {date}
    </Typography>
    <Typography variant="body1">
      {text}
    </Typography>
  </Box>
));

export default Message;
