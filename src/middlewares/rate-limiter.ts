import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60, // Limit each IP to 60 requests per window
  message: 'Too many requests from this IP, please try again later.',
});
