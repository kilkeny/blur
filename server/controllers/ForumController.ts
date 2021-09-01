import { Response, Request } from 'express';
import { Topic } from '../../db/models/Topic';

export class ForumController {
  public static getTopics(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);

    Topic.findAll()// по-хорошему должна быть пагинация
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public static createTopic(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);

    const { title, content, author, comments, created } = req.body; // сейчас это никак не валидируется
    // Вернее только на фронте валидация. А валидация прежде всего должна быть на бэке.
    // Фронтовская валидация это как вишенка на торте, просто для красоты или вернее удобства пользователя
    // Плюс как доп оптимизация, чтобы не слать запрос если заранее известно что данные не валидны,
    // но сама по себе она обязана быть на бэке

    const topic = {
      title,
      content,
      author,
      comments,
      created,
    };

    Topic.create(topic)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(error.status).send(error.statusText);
      });
  }

  public static deleteTopic(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);
    const { id } = req.body;

    Topic.destroy({
      where: { id },
    })
      .then((num) => {
        if (num === 1) {
          res.send({
            message: 'Topic was deleted successfully!',
          });
        } else {
          res.send({
            message: `Cannot delete Topic with id=${id}. Maybe Topic was not found!`,
          });
        }
      })
      .catch((error) => {
        res.status(error.status).send(error.statusText);
      });
  }
}
