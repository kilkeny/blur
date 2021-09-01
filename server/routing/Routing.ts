import express, { Express } from 'express';
import path from 'path';
import { AuthController, ForumController, ProfileController, ThemeController } from 'server/controllers';
import { BUILD_DIR } from '../../env';

export function routing(app: Express) {
  app.use(express.static(path.join(__dirname, BUILD_DIR)));

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

  app.get('/api/v2/forum/topic/:id', jsonParser, ForumController.getTopic);
  app.post('/api/v2/forum/topic/new', jsonParser, ForumController.createTopic);
  app.delete('/api/v2/forum/topic/delete', jsonParser, ForumController.deleteTopic);

  app.post('/api/v2/forum/comment/add', jsonParser, ForumController.addComment);
  app.delete('/api/v2/forum/comment/remove', jsonParser, ForumController.removeComment);

  app.get('*', (req, res) => {
    res.renderBundle(req.url);
  });
}
