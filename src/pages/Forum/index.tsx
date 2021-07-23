import React, { FC, memo, useEffect } from 'react';
import { Button, Box } from '@material-ui/core';
import { PageHeader } from '@components/PageHeader';
import { ForumCard } from '@components/ForumCard';
import { withAuth } from '@core/HOKs/withAuth';
import { useDispatch } from 'react-redux';
import { allowNotifications } from '@core/store';
import { forumCardsData } from './forum.mock';

export const WrapperForum: FC = memo(() => {
  const handleFormCardClick = () => console.log('create new');
  const dispatch = useDispatch();

  useEffect(() => {
    Notification.requestPermission();

    if (Notification.permission === 'granted') {
      dispatch(allowNotifications());

      // eslint-disable-next-line
      const notification = new Notification(
        'Новые сообщения',
        {
          body: 'У вас 3 непрочитанных сообщения',
          silent: true,
        },
      );
    }
  }, []);

  return (
    <>
      <PageHeader title="forum"><Button variant="text" color="primary" onClick={handleFormCardClick}>+ create new</Button></PageHeader>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {forumCardsData.map((card) => (
          <Box mb="60px" key={card.id}>
            <ForumCard
              title={card.title}
              date={card.date}
              author={card.author}
              answers={card.answers}
            />
          </Box>
        ))}
      </Box>
    </>
  );
});

export const Forum = withAuth(WrapperForum);
