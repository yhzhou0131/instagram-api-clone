import { Post } from '@/db/models/index.js';

const postQueries = {
  posts: async (_, {}, { redisClient }) => {
    const cachedPosts = await redisClient.get('posts');
    if (cachedPosts) {
      return JSON.parse(cachedPosts);
    }

    const posts = await Post.find();
    redisClient.set('posts', JSON.stringify(posts), 'EX', 3600);
    return posts;
  },
  post: async (_, { id }) => {
    const post = await Post.findById(id);
    return post;
  },
};

export default postQueries;
