import mongoose from 'mongoose';
import { config } from './index.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.db.url);
  } catch (e) {
    throw new Error(e);
  }
};
