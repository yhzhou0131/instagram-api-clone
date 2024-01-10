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

const redis = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT) || 6379,
};

export { port, env, mongo, redis };
