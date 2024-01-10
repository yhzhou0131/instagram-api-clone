import mongoose from 'mongoose';
import { z } from 'zod';

const createPostInputSchema = z.object({
  post: z.object({
    poster: z.instanceof(mongoose.Types.ObjectId),
    photo: z.array(z.string()),
    caption: z.string().optional(),
  }),
});

export type CreatePostInput = z.infer<typeof createPostInputSchema>;

const updatePostInputSchema = z.object({
  id: z.instanceof(mongoose.Types.ObjectId),
  post: z.object({
    photo: z.array(z.string()).optional(),
    caption: z.string().optional(),
  }),
});

export type UpdatePostInput = z.infer<typeof updatePostInputSchema>;
