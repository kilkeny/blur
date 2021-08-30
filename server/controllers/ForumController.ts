import { Response, Request } from 'express';
import { Topic } from '../../db/models/Topic';
import { Comment } from '../../db/models/Comment';

export class ForumController {
  public static getTopics(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);

    Topic.findAll({ include: [Comment] })
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(error.status).send(error.statusText);
      });
  }

  public static createTopic(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);

    const { title, content, author, created } = req.body;

    const topic = {
      title,
      content,
      author,
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

  public static addComment(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);

    const { topicid, author, content, created } = req.body;

    const comment = {
      topicid,
      author,
      content,
      created,
    };

    Comment.create(comment)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(error.status).send(error.statusText);
      });
  }

  public static removeComment(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);

    const { commentid } = req.body;

    Comment.destroy({
      where: { commentid },
    })
      .then((num) => {
        if (num === 1) {
          res.send({
            message: 'Comment was deleted successfully!',
          });
        } else {
          res.send({
            message: `Cannot delete Comment with id=${commentid}. Maybe Comment was not found!`,
          });
        }
      })
      .catch((error) => {
        res.status(error.status).send(error.statusText);
      });
  }
}
