import { Post } from '@/db/models/index.js';
import { MongoID, Context } from '@/types/common.js';

const postQueries = {
  posts: async () => {
    const posts = await Post.find();
    return posts;
  },
  post: async (_: any, { id }: MongoID) => {
    const post = await Post.findById(id);
    return post;
  },
};

export default postQueries;
