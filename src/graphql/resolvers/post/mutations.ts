import { Post } from '@/db/models/index.js';
import { MongoID } from '@/types/common.js';
import { CreatePostInput, UpdatePostInput } from '@/types/post.js';

const postMutations = {
  createPost: async ({}, { post }: CreatePostInput) => {
    const newPost = new Post(post);
    return newPost.save();
  },
  updatePost: async ({}, { id, post }: UpdatePostInput) => {
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
    return updatedPost;
  },
  deletePost: async ({}, { id }: MongoID) => {
    const deletedPost = await Post.findByIdAndDelete(id);
    return deletedPost;
  },
};

export default postMutations;
