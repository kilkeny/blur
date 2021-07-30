import * as FormData from 'form-data';
import { Server } from './server';

// У nodejs нет FormData, необходимо для нормальной работы POST запросов а API Express
(global as any).FormData = FormData;

const PORT = Number(process.env.PORT) || 8000;

const ExpressServer = new Server();

ExpressServer.start(PORT)
  .then((port) => {
    console.info(
      `--------------- The server started on port: ${port}! ---------------`,
    );
  })
  .catch((error) => {
    console.error(error);
  });
