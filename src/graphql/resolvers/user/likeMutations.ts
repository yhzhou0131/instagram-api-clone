import { Like } from '@/db/models/index.js';

const likeMutations = {
  likePost: async (_, { uid, postId }) => {
    const curTime = Date.now();
    const res = await Like.updateOne(
      { uid, postId },
      { $setOnInsert: { uid, postId, time: curTime } },
      { upsert: true }
    );

    return res.upsertedCount > 0;
  },
  dislikePost: async (_, { uid, postId }) => {
    const res = await Like.deleteOne({
      uid,
      postId,
    });

    return res.deletedCount > 0;
  },
};

export default likeMutations;
