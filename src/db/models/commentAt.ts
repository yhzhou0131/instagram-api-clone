import mongoose, { Schema, model } from 'mongoose';

const commentAtSchema = new Schema(
  {
    uid: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    posterId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    postId: { type: mongoose.Types.ObjectId, ref: 'posts', required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model('comments', commentAtSchema);
