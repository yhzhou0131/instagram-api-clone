import mongoose, { Schema, model } from 'mongoose';

const likeSchema = new Schema(
  {
    uid: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    postId: { type: mongoose.Types.ObjectId, ref: 'posts', required: true },
  },
  { timestamps: true }
);

export default model('likes', likeSchema);
