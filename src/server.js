import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import { errorHadler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  app.use(cors());

  // app.use(
  //   express.json({
  //     type: ['application/json', 'application/vnd.api+json'],
  //   }),
  // );

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  app.use('/contacts', contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHadler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
