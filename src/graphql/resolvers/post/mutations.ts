import { Post } from '@/db/models/index.js';

const postMutations = {
  createPost: async (_, { post }) => {
    const newPost = new Post(post);
    return newPost.save();
  },
  updatePost: async (_, { id, post }) => {
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    return updatedPost;
  },
  deletePost: async (_, { id }) => {
    const deletedPost = await Post.findByIdAndDelete(id);
    return deletedPost;
  },
};

export default postMutations;
