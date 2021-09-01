import React, { FC, memo } from 'react';
import { Paper, Typography, Box, Button } from '@material-ui/core';
import { generatePath, useHistory } from 'react-router-dom';
import { deleteTopicThunk, TopicType } from 'client/core/store';
import { useDispatch } from 'react-redux';

export const ForumCard: FC<TopicType> = memo((
  { id, title, content, author, comments = [], created },
) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = () => {
    history.push(generatePath('/discussion/:id', { id }));
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget as HTMLElement;
    const targetId = target.dataset.id;
    if (targetId) {
      dispatch(deleteTopicThunk({ id: parseInt(targetId, 10) }));
    }
    e.stopPropagation();
  };

  return (
    <Paper elevation={22} onClick={handleClick}>
      <Box px="53px" py="46px" width="580px">
        <Typography variant="body1">
          {created}
        </Typography>
        <Box my="33px" height="118px">
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1">{content}</Typography>
        </Box>
        <Typography variant="body1">created by {author}</Typography>
        <Typography variant="body1">comments: {comments.length}</Typography>
        <Button data-id={id} variant="outlined" color="primary" onClick={handleDelete}>delete</Button>
      </Box>
    </Paper>
  );
});
