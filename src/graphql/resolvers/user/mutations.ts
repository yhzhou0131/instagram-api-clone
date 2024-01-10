import { Post, User } from '@/db/models/index.js';
import likeMutations from './action/likeMutations.js';
import commentMutations from './action/commentMutations.js';
import followMutations from './action/followMutations.js';

const userMutations = {
  createUser: async (_, { user }) => {
    const newUser = new User(user);
    return newUser.save();
  },
  updateUser: async (_, { id, user }) => {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true }); // return the updated user
    return updatedUser;
  },
  deleteUser: async (_, { id }) => {
    await Post.updateMany(
      { $or: [{ 'likedUsers.id': id }, { 'commentedUsers.id': id }] },
      { $pull: { likedUsers: { id: id }, commentedUsers: { id: id } } }
    );
    const deletedUser = await User.findByIdAndDelete(id);

    return deletedUser;
  },
  ...likeMutations,
  ...commentMutations,
  ...followMutations,
};

export default userMutations;
