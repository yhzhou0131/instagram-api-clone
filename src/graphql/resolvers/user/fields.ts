import { Post, User } from '@/db/models/index.js';

const userFields = {
  User: {
    posts: (user: any) => {
      return user.posts.map((postId) => Post.findById(postId));
    },
    followers: (user: any) => {
      return user.followers.map((uid) => User.findById(uid));
    },
    following: (user: any) => {
      return user.following.map((uid) => User.findById(uid));
    },
    likedPosts: async (user: any) => {
      return await Promise.all(
        user.likedPosts.map(async (likedPost) => {
          const post = await Post.findById(likedPost.id).lean();
          return {
            ...post,
            likedTime: likedPost.time,
          };
        })
      );
    },
    commentedPosts: async (user: any) => {
      return await Promise.all(
        user.commentedPosts.map(async (commentPost) => {
          const post = await Post.findById(commentPost.id).lean();
          return {
            ...post,
            comment: commentPost.comment,
            commentedTime: commentPost.time,
          };
        })
      );
    },
  },
};

export default userFields;
