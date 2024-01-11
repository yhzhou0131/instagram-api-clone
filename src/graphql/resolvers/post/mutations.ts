import { Post } from '@/db/models/index.js';
import { MongoID } from '@/types/common.js';
import { CreatePostInput, UpdatePostInput } from '@/types/post.js';

const postMutations = {
  createPost: async (_: any, { post }: CreatePostInput) => {
    const newPost = new Post(post);
    return newPost.save();
  },
  updatePost: async (_: any, { id, post }: UpdatePostInput) => {
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    return updatedPost;
  },
  deletePost: async (_: any, { id }: MongoID) => {
    const deletedPost = await Post.findByIdAndDelete(id);
    return deletedPost;
  },
};

export default postMutations;
