import { BaseAPI } from './base.api';
import { HTTP } from './api';
import { ForumProps, TopicType } from '../store/store.types';

const ForumAPIInstance = new HTTP('/forum', '/api/v2');

export type CreateTopicProps = Omit<TopicType, 'id' | 'created' | 'comments'>;
export type DeleteTopicProps = Pick<TopicType, 'id'>;

export class ForumAPI extends BaseAPI {
  static getTopics() {
    return ForumAPIInstance.get<any, ForumProps>('/all');
  }

  static createTopic(data: CreateTopicProps) {
    return ForumAPIInstance.post<CreateTopicProps, any>('/new', { data });
  }

  static deleteTopic(data: DeleteTopicProps) {
    return ForumAPIInstance.delete<DeleteTopicProps, any>('/delete', { data });
  }
}
