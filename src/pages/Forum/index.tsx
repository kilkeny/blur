import React, { FC, memo } from 'react';
import { Button, Box } from '@material-ui/core';
import PageHeader from '@core/components/PageHeader';
import ForumCard from '@boot/components/ForumCard';

const Forum: FC = memo(() => (
  <>
      <PageHeader title="forum"><Button variant="text" color="primary" onClick={() => console.log('create new')}>+ create new</Button></PageHeader>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
      <Box mb="60px"><ForumCard title="тема обсуждения с каким-то длинным названием которое не помещается на карточке очень-очнь длинным и..." date="may 10, 2021" author="username" answers={10} /></Box>
      <Box mb="60px"><ForumCard title="тема 1" date="may 10, 2021" author="username" answers={10} /></Box>
      <Box mb="60px"><ForumCard title="тема 2" date="may 10, 2021" author="username" answers={10} /></Box>
    </Box>
    </>
));

export default Forum;
