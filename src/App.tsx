import React, { FC, memo } from 'react';
import { Login } from '@pages/Login';
import { SignUp } from '@pages/SignUp';

export const App: FC = memo(() => (
  <>
    <Login />
    <SignUp />
  </>
));
