import { z } from 'zod';
import mongoose from 'mongoose';
import { Redis } from 'ioredis';

const idSchema = z.object({
  id: z.instanceof(mongoose.Types.ObjectId),
});

export type MongoID = z.infer<typeof idSchema>;

const contextSchema = z.object({
  redisClient: z.instanceof(Redis),
});

export type Context = z.infer<typeof contextSchema>;
