import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    biography: String,
    posts: [{ type: mongoose.Types.ObjectId, ref: 'posts' }],
    followers: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    following: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
  },
  {
    timestamps: true,
  }
);

export default model('users', userSchema);
