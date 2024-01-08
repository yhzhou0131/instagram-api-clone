import mongoose, { Schema, model } from 'mongoose';

const likeSchema = new Schema(
  {
    id: { type: mongoose.Types.ObjectId, ref: 'posts' },
    time: Date,
  },
  { _id: false }
);

const commentSchema = new Schema(
  {
    id: { type: mongoose.Types.ObjectId, ref: 'posts' },
    comment: String,
    time: Date,
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    biography: String,
    posts: [{ type: mongoose.Types.ObjectId, ref: 'posts' }],
    followers: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    following: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    likedPosts: [likeSchema],
    commentedPosts: [commentSchema],
  },
  {
    timestamps: true,
  }
);

export default model('users', userSchema);
