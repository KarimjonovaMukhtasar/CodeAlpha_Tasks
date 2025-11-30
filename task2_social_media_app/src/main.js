import express from 'express';
import { mainRouter } from './routers/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { config } from './config/index.js';
import morgan from 'morgan';
import { logger } from './utils/logger.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  try {
    const PORT = config.db.PORT || 5050;
    const app = express();
    app.set('view engine', 'ejs');
    app.set('views', path.join(process.cwd(), 'src', 'views'));
    express.urlencoded({ extended: true });
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(morgan('tiny'));
    app.use(express.static(path.join(process.cwd(), 'src', 'public')));
    app.use('/', mainRouter);
    app.use(errorHandler);
    app.listen(PORT, () => {
      logger.info(`SERVER IS RUNNING ON PORT ${PORT}`);
    });
  } catch (err) {
    console.error('Error in main.js:', err);
  }
}
main();
