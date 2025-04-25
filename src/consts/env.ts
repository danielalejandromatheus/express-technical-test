import dotenv from 'dotenv';
import type { SignOptions } from 'jsonwebtoken';
dotenv.config();

export const {
  PORT = 3000,
  NODE_ENV = 'development',
  MONGODB_URI = 'mongodb://localhost:27017/yourdb',
  JWT_SECRET,
  // To not install an unnecessary depencency, we use the same type as the jwt.sign function
  JWT_EXPIRATION = '1h',
} = process.env as {
  PORT: string;
  NODE_ENV: string;
  MONGODB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRATION: SignOptions['expiresIn'];
};
