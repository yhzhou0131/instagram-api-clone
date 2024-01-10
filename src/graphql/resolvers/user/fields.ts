import { CommentAt, Like, Post, User } from '@/db/models/index.js';
import { MongoID } from '@/types/common.js';

const userFields = {
  User: {
    posts: (user: any) => {
      return user.posts.map((postId: MongoID) => Post.findById(postId));
    },
    followers: (user: any) => {
      return user.followers.map((uid: MongoID) => User.findById(uid));
    },
    following: (user: any) => {
      return user.following.map((uid: MongoID) => User.findById(uid));
    },
    likedPosts: async (user: any) => {
      const userLikes = await Like.find({ uid: user._id });
      return await Promise.all(
        userLikes.map(async (userLike) => {
          const post = await Post.findById(userLike.postId).lean();
          return {
            ...post,
            likeId: userLike._id,
            likedTime: userLike.createdAt,
          };
        })
      );
    },
    commentedPosts: async (user: any) => {
      const userComments = await CommentAt.find({ uid: user._id }).setOptions({
        sort: { updatedAt: -1 },
      });
      return await Promise.all(
        userComments.map(async (userComment) => {
          const post = await Post.findById(userComment.postId)
            .populate('poster')
            .lean();
          return {
            ...post,
            commentId: userComment._id,
            comment: userComment.comment,
            commentedTime: userComment.updatedAt,
          };
        })
      );
    },
  },
};

export default userFields;
