import React, { FC, memo } from 'react';
import { Paper, Typography, Box, Button } from '@material-ui/core';
import { generatePath, useHistory } from 'react-router-dom';

interface ForumCardProps {
  id: string;
  date: string;
  title: string;
  content: string;
  author: string;
  answers: number;
  handleDelete: any;
}

export const ForumCard: FC<ForumCardProps> = memo((
  { date, title, content, author, answers, id, handleDelete },
) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(generatePath('/discussion/:id', { id }));
  };

  return (
    <Paper elevation={22} onClick={handleClick}>
      <Box px="53px" py="46px" width="580px">
        <Typography variant="body1">{date}</Typography>
        <Box my="33px" height="118px">
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1">{content}</Typography>
        </Box>
        <Typography variant="body1">created by {author}</Typography>
        <Typography variant="body1">{answers} answers</Typography>
        <Button data-id={id} variant="outlined" color="primary" onClick={handleDelete}>delete</Button>
      </Box>
    </Paper>
  );
});
