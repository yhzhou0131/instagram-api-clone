import { Post, User } from '@/db/models/index.js';
import likeMutations from './action/likeMutations.js';
import commentMutations from './action/commentMutations.js';
import followMutations from './action/followMutations.js';
import { MongoID } from '@/types/common.js';
import { CreateUserInput, UpdateUserInput } from '@/types/user.js';

const userMutations = {
  createUser: async ({}, { user }: CreateUserInput) => {
    const newUser = new User(user);
    return newUser.save();
  },
  updateUser: async ({}, { id, user }: UpdateUserInput) => {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true }); // return the updated user
    return updatedUser;
  },
  deleteUser: async ({}, { id }: MongoID) => {
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
