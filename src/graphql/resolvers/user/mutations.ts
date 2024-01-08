import { Post, User } from '@/db/models/index.js';

const userMutations = {
  createUser: async (_, { user }) => {
    const newUser = new User(user);
    return newUser.save();
  },
  updateUser: async (_, { id, user }) => {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true }); // return the updated user
    return updatedUser;
  },
  deleteUser: async (_, { uid }) => {
    await Post.updateMany(
      { $or: [{ 'likedUsers.id': uid }, { 'commentedUsers.id': uid }] },
      { $pull: { likedUsers: { id: uid }, commentedUsers: { id: uid } } }
    );
    const deletedUser = await User.findByIdAndDelete(uid);

    return deletedUser;
  },
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

export default userMutations;
