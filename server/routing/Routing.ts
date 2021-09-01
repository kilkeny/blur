import express, { Express } from 'express';
import path from 'path';
import { AuthController, ForumController, ProfileController, ThemeController } from 'server/controllers';
import { BUILD_DIR } from '../../env';

export function routing(app: Express) {
  app.use(express.static(path.join(__dirname, BUILD_DIR))); // можно вынести в server.ts к другим миддлварам

  const jsonParser = express.json();

  app.get('/api/v2/auth/user', AuthController.profile);
  app.get('/api/v2/oauth/yandex/service-id', AuthController.OAuthGetClientId);
  app.post('/api/v2/oauth/yandex', jsonParser, AuthController.OAuthSignin);
  app.post('/api/v2/auth/signin', jsonParser, AuthController.signin);
  app.post('/api/v2/auth/signup', jsonParser, AuthController.signup);
  app.post('/api/v2/auth/logout', jsonParser, AuthController.logout);

  app.put('/api/v2/user/profile', jsonParser, ProfileController.change);

  app.put('/api/v2/theme', jsonParser, ThemeController.change);

  app.get('/api/v2/forum/all', jsonParser, ForumController.getTopics);
  app.post('/api/v2/forum/new', jsonParser, ForumController.createTopic);
  app.delete('/api/v2/forum/delete', jsonParser, ForumController.deleteTopic);

  app.get('*', (req, res) => {
    res.renderBundle(req.url);
  });
}
