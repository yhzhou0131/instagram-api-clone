import mongoose, { Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    poster: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
    caption: { type: String, required: true },
    photo: { type: String },
  },
  {
    timestamps: true,
  }
);

postSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

postSchema.set('toJSON', { virtuals: true });

export default model('posts', postSchema);
