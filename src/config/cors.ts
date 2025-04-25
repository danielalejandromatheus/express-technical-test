import { CorsOptions } from 'cors';
const whitelist = [
  'http://localhost:3000', // frontend dev
  'https://novatech.app', // frontend prod
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
