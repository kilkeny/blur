import React, { FC, memo } from 'react';
import { Typography, Box, Button } from '@material-ui/core';
import { CommentType, removeCommentThunk } from 'client/core/store';
import { useDispatch } from 'react-redux';

export const Message: FC<CommentType> = memo(({ content, author, created, commentid }) => {
  const dispatch = useDispatch();

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget as HTMLElement;
    const { id } = target.dataset;
    if (id) {
      dispatch(removeCommentThunk({ commentid: parseInt(id, 10) }));
    }
    e.stopPropagation();
  };

  return (
    <Box>
      <Typography variant="body1" gutterBottom color="textSecondary">{author} on {created}</Typography>
      <Typography variant="body1">{content}</Typography>
      <Button data-id={commentid} variant="outlined" color="primary" onClick={handleDelete}>delete</Button>
    </Box>
  );
});
