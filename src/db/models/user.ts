import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    biography: String,
    posts: [{ type: mongoose.Types.ObjectId, ref: 'posts' }],
    followers: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    following: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userSchema.set('toJSON', { virtuals: true });

export default model('users', userSchema);
