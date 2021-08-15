import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const sequelizeOptions: SequelizeOptions = {
  host: 'postgres://blur:blur100500@postgres:5432/blur-db',
  port: 5432,
  username: 'blur',
  password: 'blur100500',
  database: 'blur-db',
  dialect: 'postgres',
  models: ['/tables'],
};

export const sequelize = new Sequelize(sequelizeOptions);
