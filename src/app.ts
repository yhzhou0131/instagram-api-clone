import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from '@/graphql/index.js';
import cors from 'cors';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { Redis } from 'ioredis';
import { redis } from '@/config/index.js';

interface Context {
  token?: string;
}

const app = express();

const httpServer = http.createServer(app);

const redisClient = new Redis({
  host: redis.host,
  port: redis.port,
});

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

// Specify the path where we'd like to mount our server
app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async () => ({ redisClient }),
  })
);

export default httpServer;
