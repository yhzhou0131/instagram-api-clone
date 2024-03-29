import { User } from '@/db/models/index.js';
import { MongoID, Context } from '@/types/index.js';

const userQueries = {
  users: async (_: any, {}, { redisClient }: Context) => {
    const cachedUsers = await redisClient.get('users');
    if (cachedUsers) {
      return JSON.parse(cachedUsers);
    }

    const users = await User.find();
    redisClient.set('users', JSON.stringify(users), 'EX', 3600);
    return users;
  },
  user: async (_: any, { id }: MongoID) => {
    const user = await User.findById(id);
    return user;
  },
};

export default userQueries;
