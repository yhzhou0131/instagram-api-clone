import { User, Post } from '@/db/models/index.js';

const commentMutations = {
  commentPost: async (_, { uid, postId, comment }) => {
    const curTime = Date.now();
    const resUser = await User.updateOne(
      { _id: uid },
      {
        $addToSet: {
          commentedPosts: {
            id: postId,
            comment: comment,
            time: curTime,
          },
        },
      }
    );
    const resPost = await Post.updateOne(
      { _id: postId },
      {
        $addToSet: {
          commentedUsers: {
            id: uid,
            comment: comment,
            time: curTime,
          },
        },
      }
    );

    if (resUser.modifiedCount !== resPost.modifiedCount) {
      throw new Error('Something went wrong when updating the comment');
    }

    const user = await User.findById(uid);

    return user;
  },
};

export default commentMutations;
