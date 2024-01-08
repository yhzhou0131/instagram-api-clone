import mongoose from 'mongoose';
import { mongo } from '@/config/index.js';

const connectDB = async () => {
  await mongoose
    .connect(mongo.url)
    .then(() => {
      console.log(
        `Successfully connected to mongodb, db name: ${mongoose.connection.name}`
      );
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export default connectDB;
