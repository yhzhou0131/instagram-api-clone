import { User } from '@/db/models/index.js';

const postFields = {
  Post: {
    poster: async (post: any) => {
      const user = await User.findById(post.poster);
      return user;
    },
    likedUsers: async (post) => {
      return await Promise.all(
        post.likedUsers.map(async (likedUser) => {
          const user = await User.findById(likedUser.id).lean();
          return {
            ...user,
            likedTime: likedUser.time,
          };
        })
      );
    },
    commentedUsers: async (post) => {
      return await Promise.all(
        post.commentedUsers.map(async (commentedUser) => {
          const user = await User.findById(commentedUser.id).lean();
          return {
            ...user,
            comment: commentedUser.comment,
            commentedTime: commentedUser.time,
          };
        })
      );
    },
  },
};

export default postFields;
