import { BaseAPI } from './base.api';
import { HTTP } from './api';
import { CommentType, ForumProps, TopicType } from '../store/store.types';

const ForumAPIInstance = new HTTP('/forum', '/api/v2');

export type CreateTopicProps = Omit<TopicType, 'id' | 'created' | 'comments'>;
export type TopicId = Pick<TopicType, 'id'>;

export type AddCommentProps = Omit<CommentType, 'commentid'>;
export type RemoveCommentProps = Pick<CommentType, 'commentid' | 'topicid'>;

export class ForumAPI extends BaseAPI {
  static getTopics() {
    return ForumAPIInstance.get<any, ForumProps>('/all');
  }

  static createTopic(data: CreateTopicProps) {
    return ForumAPIInstance.post<CreateTopicProps, any>('/new', { data });
  }

  static deleteTopic(data: TopicId) {
    return ForumAPIInstance.delete<TopicId, any>('/delete', { data });
  }

  static addComment(data: AddCommentProps) {
    return ForumAPIInstance.post<AddCommentProps, any>('/add-comment', { data });
  }

  static removeComment(data: RemoveCommentProps) {
    return ForumAPIInstance.delete<RemoveCommentProps, any>('/remove-comment', { data });
  }
}
