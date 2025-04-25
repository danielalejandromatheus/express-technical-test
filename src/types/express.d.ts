import { Request } from 'express';
import { JwtUserPayload } from './jwt';
declare global {
  declare module Express {
    interface Request {
      user?: JwtUserPayload;
    }
  }
}
