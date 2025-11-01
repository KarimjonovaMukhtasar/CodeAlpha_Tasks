import 'dotenv/config';

export const config = {
  app: {
    port: process.env.PORT,
  },
  db: {
    url: process.env.DB_URL,
  },
};
