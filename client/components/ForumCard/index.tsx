import React, { FC, memo } from 'react';
import { Paper, Typography, Box, Button } from '@material-ui/core';
import { generatePath, useHistory } from 'react-router-dom';

interface ForumCardProps {
  id: string;
  date: string;
  title: string;
  text: string;
  author: string;
  answers: number;
  handleDelete: any;
}

export const ForumCard: FC<ForumCardProps> = memo((
  { date, title, text, author, answers, id, handleDelete },
) => {
  const history = useHistory();
  const handleClick = (e: React.SyntheticEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const isButton = target.className.split(' ').some((c) => /MuiButton-.*/.test(c));
    if (!isButton) {
      history.push(generatePath('/discussion/:id', { id }));
    }
  };

  return (
    <Paper elevation={22} onClick={handleClick}>
      <Box px="53px" py="46px" width="580px">
        <Typography variant="body1">{date}</Typography>
        <Box my="33px" height="118px">
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1">{text}</Typography>
        </Box>
        <Typography variant="body1">created by {author}</Typography>
        <Typography variant="body1">{answers} answers</Typography>
        <Button data-id={id} variant="outlined" color="primary" onClick={handleDelete}>delete</Button>
      </Box>
    </Paper>
  );
});
