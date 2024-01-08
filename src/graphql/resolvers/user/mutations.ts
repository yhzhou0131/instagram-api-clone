import { Post, User } from '@/db/models/index.js';
import likeMutations from './likeMutations.js';
import commentMutations from './commentMutations.js';

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
  ...likeMutations,
  ...commentMutations,
};

export default userMutations;
