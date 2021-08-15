import * as FormData from 'form-data';
import { sequelize } from 'db/models';
import { Server } from './server';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// У nodejs нет FormData, необходимо для нормальной работы POST запросов а API Express
(global as any).FormData = FormData;

const PORT = Number(process.env.PORT) || 8000;

const ExpressServer = new Server();

try {
  sequelize.authenticate();
  // sequelize.sync({ force: true });
  console.info('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

ExpressServer.start(PORT)
  .then((port) => {
    console.info(
      `--------------- The server started on port: ${port}! ---------------`,
    );
  })
  .catch((error) => {
    console.error(error);
  });
