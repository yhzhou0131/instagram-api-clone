import { User, Post } from '@/db/models/index.js';

const likeMutations = {
  likePost: async (_, { uid, postId }) => {
    const curTime = Date.now();
    const resUser = await User.updateOne(
      { _id: uid, 'likedPosts.id': { $ne: postId } },
      { $addToSet: { likedPosts: { id: postId, time: curTime } } }
    );
    const resPost = await Post.updateOne(
      { _id: postId, 'likedUsers.id': { $ne: uid } },
      { $addToSet: { likedUsers: { id: uid, time: curTime } } }
    );

    if (resUser.modifiedCount !== resPost.modifiedCount) {
      throw new Error('Something went wrong when updating the like.');
    }

    const user = await User.findById(uid);

    return user;
  },
};

export default likeMutations;
