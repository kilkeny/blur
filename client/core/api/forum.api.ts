import { BaseAPI } from './base.api';
import { HTTP } from './api';

const ForumAPIInstance = new HTTP('/forum', '/api/v2');

export type CreateTopicProps = {
  title: string;
  text: string;
  author: string;
};

export type DeleteTopicProps = {
  id: number
};

export class ForumAPI extends BaseAPI {
  static getTopics() {
    return ForumAPIInstance.get('/topics');
  }

  static createTopic(data: CreateTopicProps) {
    return ForumAPIInstance.post<CreateTopicProps, any>('/new', { data });
  }

  static deleteTopic(data: DeleteTopicProps) {
    return ForumAPIInstance.post<DeleteTopicProps, any>('/delete', { data });
  }
}
