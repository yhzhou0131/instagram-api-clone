import mongoose from 'mongoose';
import { z } from 'zod';

const createUserInputSchema = z.object({
  user: z.object({
    name: z.string(),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string(),
    biography: z.string().optional(),
  }),
});

export type CreateUserInput = z.infer<typeof createUserInputSchema>;

const updateUserInputSchema = z.object({
  id: z.instanceof(mongoose.Types.ObjectId),
  user: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    biography: z.string().optional(),
  }),
});

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;
