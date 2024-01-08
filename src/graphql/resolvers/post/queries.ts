import { Post } from '@/db/models/index.js';

const postQueries = {
  posts: async () => {
    const posts = await Post.find();
    return posts;
  },
  post: async (_, { id }) => {
    const post = await Post.findById(id);
    return post;
  },
};

export default postQueries;
