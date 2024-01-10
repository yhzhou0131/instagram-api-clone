import { CommentAt, Like, User } from '@/db/models/index.js';

const postFields = {
  Post: {
    poster: async (post: any) => {
      const user = await User.findById(post.poster);
      return user;
    },
    likedUsers: async (post: any) => {
      const postLikes = await Like.find({ postId: post._id });
      return await Promise.all(
        postLikes.map(async (postLike) => {
          const user = await User.findById(postLike.uid).lean();
          return {
            ...user,
            likeId: postLike._id,
            likedTime: postLike.createdAt,
          };
        })
      );
    },
    commentedUsers: async (post: any) => {
      const postComments = await CommentAt.find({
        postId: post._id,
      }).setOptions({ sort: { updatedAt: -1 } });
      return await Promise.all(
        postComments.map(async (postComment) => {
          const user = await User.findById(postComment.uid).lean();
          return {
            ...user,
            commentId: postComment._id,
            comment: postComment.comment,
            commentedTime: postComment.updatedAt,
          };
        })
      );
    },
  },
};

export default postFields;
