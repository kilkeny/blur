import { Response, Request } from 'express';
import { Topic } from '../../db/models/Topic';

export class ForumController {
  public static getTopics(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);

    Topic.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public static createTopic(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);

    const { title, content, author } = req.body;

    const topic = {
      title,
      content,
      author,
    };

    Topic.create(topic)
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch((error) => {
        res.status(error.status).send(error.statusText);
      });
  }

  public static deleteTopic(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);

    const { id } = req.params;

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
