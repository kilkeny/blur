/* eslint-disable import/no-cycle */
import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Comment } from './Comment';

@Table({
  freezeTableName: true,
  tableName: 'topic',
  timestamps: true,
  updatedAt: false,
})
export class Topic extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  title!: string;

  @AllowNull(false)
  @Column(DataType.STRING(500))
  content!: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  author!: string;

  @HasMany(() => Comment)
  comments!: Comment[];

  @CreatedAt
  created?: Date;
}
