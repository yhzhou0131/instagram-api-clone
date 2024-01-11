import { User } from '@/db/models/index.js';
import { FollowInput } from '@/types/action.js';
import { Context } from '@/types/common.js';
import { clearCacheByKey } from '@/utils/util.js';

const followMutations = {
  follow: async (
    _: any,
    { uid, targetUser }: FollowInput,
    { redisClient }: Context
  ) => {
    await clearCacheByKey(redisClient, 'users');
    const res = await User.updateOne(
      { _id: uid },
      { $addToSet: { following: targetUser } }
    );
    const targetRes = await User.updateOne(
      { _id: targetUser },
      { $addToSet: { followers: uid } }
    );

    if (res.modifiedCount !== targetRes.modifiedCount) {
      throw new Error('Something went wrong during follow operation.');
    }
    return true;
  },
  unfollow: async (
    _: any,
    { uid, targetUser }: FollowInput,
    { redisClient }: Context
  ) => {
    await clearCacheByKey(redisClient, 'users');
    const res = await User.updateOne(
      { _id: uid },
      { $pull: { following: targetUser } }
    );
    const targetRes = await User.updateOne(
      { _id: targetUser },
      { $pull: { followers: uid } }
    );

    if (res.modifiedCount !== targetRes.modifiedCount) {
      throw new Error('Something went wrong during unfollow operation.');
    }
    return true;
  },
};

export default followMutations;
