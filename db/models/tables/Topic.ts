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

@Table
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
  text!: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  author!: string;

  @HasMany(() => Comment)
  comments!: Comment[];

  @CreatedAt
  creationDate!: Date;
}
