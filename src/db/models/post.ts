import mongoose, { Schema, model } from 'mongoose';

const likeSchema = new Schema(
  {
    id: { type: mongoose.Types.ObjectId, ref: 'users' },
    time: Date,
  },
  { _id: false }
);

const commentSchema = new Schema(
  {
    id: { type: mongoose.Types.ObjectId, ref: 'users' },
    comment: String,
    time: Date,
  },
  { _id: false }
);

const postSchema = new Schema(
  {
    poster: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
    caption: { type: String, required: true },
    photo: { type: String },
    likedUsers: [likeSchema],
    commentedUsers: [commentSchema],
  },
  {
    timestamps: true,
  }
);

export default model('posts', postSchema);
