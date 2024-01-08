import { User } from '@/db/models/index.js';

const userQueries = {
  users: async () => {
    const users = await User.find();
    return users;
  },
  user: async (_, { id }) => {
    const user = await User.findById(id).populate({ path: 'likedPosts.id' });
    return user;
  },
};

export default userQueries;
