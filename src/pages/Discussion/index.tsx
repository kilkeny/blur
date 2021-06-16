import React, { FC, memo } from 'react';
import { Link, Paper, Box } from '@material-ui/core';
import PageHeader from '@core/components/PageHeader';
import Message, { MessageEnum } from '@boot/components/Message';

const Discussion: FC = memo(() => (
  <>
      <PageHeader title="forum"><Link href="forum">&lt; back to all discussions</Link></PageHeader>
      <Paper elevation={22}>
      <Box px="100px" py="80px">
          <Box>
          <Message type={MessageEnum.Question} text="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." author="username" date="may 10, 2021" />
        </Box>
          <Box>
          <Message type={MessageEnum.Answer} text="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem." author="other_user" date="may 11, 2021" />
          <Message type={MessageEnum.Answer} text="Neque porro quisquam est" author="username" date="may 11, 2021" />
          <Message type={MessageEnum.Answer} text="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem." author="username" date="may 12, 2021" />
        </Box>
        </Box>
    </Paper>
    </>
));

export default Discussion;
