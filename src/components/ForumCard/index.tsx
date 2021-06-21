import React, { FC, memo } from 'react';
import { Paper, Typography, Box } from '@material-ui/core';

interface ForumCardProps {
  date: string;
  title: string;
  author: string;
  answers: number;
}

export const ForumCard: FC<ForumCardProps> = memo(({ date, title, author, answers }) => {
  const handleCardClick = () => console.log('to page');
  return (
    <Paper elevation={22} onClick={handleCardClick}>
      <Box px="53px" py="46px" width="580px">
        <Typography variant="body1">{date}</Typography>
        <Box my="33px" height="118px"><Typography variant="h6">{title}</Typography></Box>
        <Typography variant="body1">created by {author}</Typography>
        <Typography variant="body1">{answers} answers</Typography>
      </Box>
    </Paper>
  );
});
