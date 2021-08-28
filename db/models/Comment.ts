/* eslint-disable import/no-cycle */
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Topic } from './Topic';

@Table({
  freezeTableName: true,
  tableName: 'comment',
  timestamps: false,
})

export class Comment extends Model {
  @ForeignKey(() => Topic)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  topicid: number;

  @BelongsTo(() => Topic, {
    foreignKey: 'topicid',
  })
  topic: Topic;

  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  commentid: number;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  content: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  author: string;

  @AllowNull(false)
  @Column(DataType.STRING(25))
  created: string;
}
