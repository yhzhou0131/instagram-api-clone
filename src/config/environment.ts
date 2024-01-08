import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

const env = {
  development: process.env.NODE_ENV === 'development',
  production: process.env.NODE_ENV === 'production',
};

const mongo = {
  url: process.env.MONGO_URI || '',
};

export { port, env, mongo };
