import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'src/consts/env';
import { UnauthorizedException } from 'src/utils/exceptions/http.exception';
import { JwtUserPayload } from 'src/types/jwt';

export default (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) {
    throw new UnauthorizedException();
  }
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new UnauthorizedException();
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload as JwtUserPayload;
    next();
  } catch (err) {
    throw new UnauthorizedException('Invalid token');
  }
};
