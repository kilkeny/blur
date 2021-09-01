import { Response, Request, NextFunction } from 'express';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => { // Не используется
  /*
  Да и на самом деле просто проверить то что кука есть в хедерах это не значит что юзер авторизован
  Поэтому куку нужно валидироать.
  Другой вопрос что вы не сможете этого сделать, потому что у вас авторизация от яндекса.
  Это все к тому же моменту - возможно нужно было реализовывать свою
   */
  const cookies = req.headers.cookie;
  const isAuth = cookies?.includes('authCookie') && cookies?.includes('uuid');

  if (!isAuth) {
    res.status(401).send('Unauthorized');
  }

  next();
};
