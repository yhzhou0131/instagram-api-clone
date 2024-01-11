import { CommentAt, Post } from '@/db/models/index.js';
import {
  AddCommentInput,
  DeleteCommentInput,
  EditCommentInput,
} from '@/types/action.js';
import { Context } from '@/types/common.js';
import { clearCacheByKey } from '@/utils/util.js';

const commentMutations = {
  addComment: async (
    _: any,
    { uid, postId, comment }: AddCommentInput,
    { redisClient }: Context
  ) => {
    await clearCacheByKey(redisClient, 'users');
    const posterId = (await Post.findById(postId))?.poster;
    const res = await new CommentAt({
      uid,
      posterId,
      postId,
      comment,
    }).save();

    return res !== null;
  },
  deleteComment: async (
    _: any,
    { uid, commentId }: DeleteCommentInput,
    { redisClient }: Context
  ) => {
    await clearCacheByKey(redisClient, 'users');
    const res = await CommentAt.findOneAndDelete({
      $or: [
        {
          _id: commentId,
          uid,
        },
        {
          _id: commentId,
          posterId: uid,
        }, // poster can delete all comments under their post.
      ],
    });

    if (!res) {
      throw new Error('Comment not found.');
    }

    return res !== null;
  },
  editComment: async (
    _: any,
    { uid, commentId, comment }: EditCommentInput,
    { redisClient }: Context
  ) => {
    await clearCacheByKey(redisClient, 'users');
    const res = await CommentAt.findOneAndUpdate(
      { _id: commentId, uid },
      { comment }
    );

    if (!res) {
      throw new Error('Comment not found.');
    }

    return res !== null;
  },
};

export default commentMutations;
