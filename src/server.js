import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { env } from './utilits/env.js';
import contactsRouter from './routers/contacts.js'; // Імпортуємо роутер контактів
import errorHandler from './middlewares/errorHandler.js'; // Імпортуємо обробку помилок
import notFoundHandler from './middlewares/notFoundHandler.js'; // Імпортуємо обробку "не знайдено"

dotenv.config();
const PORT = Number(env('PORT', '3001'));

export const setupServer = () => {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());
  app.use(express.json());

  // Підключаємо роутер для контактів
  app.use('/contacts', contactsRouter);

  // Обробка неіснуючих маршрутів
  app.use(notFoundHandler);

  // Middleware для обробки помилок
  app.use(errorHandler);

  app.listen(PORT, () => console.log(`This server running on PORT ${PORT}`));
};







