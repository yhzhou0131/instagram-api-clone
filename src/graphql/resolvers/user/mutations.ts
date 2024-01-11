import { Post, User } from '@/db/models/index.js';
import likeMutations from './action/likeMutations.js';
import commentMutations from './action/commentMutations.js';
import followMutations from './action/followMutations.js';
import { Context, MongoID } from '@/types/common.js';
import {
  CreateUserInput,
  UpdateUserInput,
  createUserInputSchema,
} from '@/types/user.js';
import { clearCacheByKey, validateDataType } from '@/utils/util.js';

const userMutations = {
  createUser: async (
    _: any,
    { user }: CreateUserInput,
    { redisClient }: Context
  ) => {
    if (validateDataType({ user }, createUserInputSchema)) {
      await clearCacheByKey(redisClient, 'users');

      const newUser = new User(user);
      return newUser.save();
    }
    return null;
  },
  updateUser: async (
    _: any,
    { id, user }: UpdateUserInput,
    { redisClient }: Context
  ) => {
    await clearCacheByKey(redisClient, 'users');

    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true }); // return the updated user
    return updatedUser;
  },
  deleteUser: async (_: any, { id }: MongoID, { redisClient }: Context) => {
    await clearCacheByKey(redisClient, 'users');

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
