/* eslint-disable import/no-cycle */
import {
  AllowNull,
  AutoIncrement,
  Column,
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
  timestamps: false,
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

  @AllowNull(false)
  @Column(DataType.STRING(25))
  created!: string;
}