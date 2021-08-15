/* eslint-disable import/no-cycle */
import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Topic } from './Topic';

@Table
export class Comment extends Model {
  @AllowNull(false)
  @ForeignKey(() => Topic)
  @Column(DataType.INTEGER)
  topicId!: number;

  @BelongsTo(() => Topic)
  topic!: Topic;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  comment!: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  author!: string;

  @CreatedAt
  creationDate!: Date;
}
