/* eslint-disable import/no-cycle */
import {
  AllowNull,
  AutoIncrement,
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
  @Column(DataType.INTEGER)
  id!: number;

  @AutoIncrement
  @Column(DataType.INTEGER)
  comment_id!: number;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  content!: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  author!: string;

  @AllowNull(false)
  @Column(DataType.STRING(25))
  created!: string;
}
