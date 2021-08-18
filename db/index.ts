import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Topic } from './models/Topic';

const sequelizeOptions: SequelizeOptions = {
  host: 'postgres',
  port: 5432,
  username: 'blur',
  password: 'blur100500',
  database: 'blur-db',
  dialect: 'postgres',
  models: [Topic],
};

export const db = new Sequelize(sequelizeOptions);
