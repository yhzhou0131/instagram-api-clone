import { User } from '@/db/models/index.js';

const userQueries = {
  users: async (_, {}, { redisClient }) => {
    const cachedUsers: string = await redisClient.get('users');
    if (cachedUsers) {
      return JSON.parse(cachedUsers);
    }

    const users = await User.find();
    redisClient.set('users', JSON.stringify(users), 'EX', 3600);
    return users;
  },
  user: async (_, { id }) => {
    const user = await User.findById(id).populate({ path: 'likedPosts.id' });
    return user;
  },
};

export default userQueries;
