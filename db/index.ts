import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Topic } from './models/Topic';
import { Comment } from './models/Comment';

const sequelizeOptions: SequelizeOptions = {
  host: 'postgres',
  port: 5432,
  username: 'blur',
  password: 'blur100500',
  database: 'blur-db',
  dialect: 'postgres',
  models: [Topic, Comment],
};

export const db = new Sequelize(sequelizeOptions);
