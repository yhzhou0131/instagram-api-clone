import mongoose from 'mongoose';
import { z } from 'zod';

const likeInputSchema = z.object({
  uid: z.instanceof(mongoose.Types.ObjectId),
  postId: z.instanceof(mongoose.Types.ObjectId),
});

export type LikeInput = z.infer<typeof likeInputSchema>;

const addCommentInputSchema = z.object({
  uid: z.instanceof(mongoose.Types.ObjectId),
  postId: z.instanceof(mongoose.Types.ObjectId),
  comment: z.string(),
});

export type AddCommentInput = z.infer<typeof addCommentInputSchema>;

const deleteCommentInputSchema = z.object({
  uid: z.instanceof(mongoose.Types.ObjectId),
  commentId: z.instanceof(mongoose.Types.ObjectId),
});

export type DeleteCommentInput = z.infer<typeof deleteCommentInputSchema>;

const editCommentInputSchema = z.object({
  uid: z.instanceof(mongoose.Types.ObjectId),
  commentId: z.instanceof(mongoose.Types.ObjectId),
  comment: z.string(),
});

export type EditCommentInput = z.infer<typeof editCommentInputSchema>;

const followInputSchema = z.object({
  uid: z.instanceof(mongoose.Types.ObjectId),
  targetUser: z.instanceof(mongoose.Types.ObjectId),
});

export type FollowInput = z.infer<typeof followInputSchema>;
