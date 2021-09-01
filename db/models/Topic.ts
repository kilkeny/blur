/* eslint-disable import/no-cycle */
import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import { Comment } from './Comment';

@Table({
  freezeTableName: true,
  tableName: 'topic',
  timestamps: false,
})
export class Topic extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  title: string;

  @AllowNull(false)
  @Column(DataType.STRING(500))
  content: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  author: string;

  @HasMany(() => Comment, {
    foreignKey: 'topicid',
    onUpdate: 'CASCADE',
  })
  comments: Comment[] = [];

  @AllowNull(false)
  @Column(DataType.STRING(25))
  created: string;
}
