import mongoose from 'mongoose';
import { config } from './environment';

const connectDB = async () => {
  try {
    if (!config.DB_URL) {
      console.error('Database URL is not defined');
      process.exit(1); 
    }

    await mongoose.connect(config.DB_URL);

    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
