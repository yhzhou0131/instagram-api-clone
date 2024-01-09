import { CommentAt, Post } from '@/db/models/index.js';

const commentMutations = {
  addComment: async (_, { uid, postId, comment }) => {
    const posterId = (await Post.findById(postId))?.poster;
    const res = await new CommentAt({
      uid,
      posterId,
      postId,
      comment,
    }).save();

    return res !== null;
  },
  deleteComment: async (_, { uid, commentId }) => {
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
  editComment: async (_, { uid, commentId, comment }) => {
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
