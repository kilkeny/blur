import React, { FC, memo } from 'react';
import { Typography, Box, Button } from '@material-ui/core';
import { CommentType, removeCommentThunk } from 'client/core/store';
import { useDispatch } from 'react-redux';

export const Message: FC<CommentType> = memo(({ content, author, created, comment_id: id }) => {
  const dispatch = useDispatch();
  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget as HTMLElement;
    const targetId = target.dataset.id;
    if (targetId) {
      dispatch(removeCommentThunk({ comment_id: parseInt(targetId, 10) }));
    }
    e.stopPropagation();
  };

  return (
    <Box>
      <Typography variant="body1" gutterBottom color="textSecondary">{author} on {created}</Typography>
      <Typography variant="body1">{content}</Typography>
      <Button data-id={id} variant="outlined" color="primary" onClick={handleDelete}>delete</Button>
    </Box>
  );
});
