import { Request, Response, NextFunction } from 'express';

export const HttpExceptionHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const error = { message: message } as {
    message: string;
    errors?: any[];
  };
  if (err.errors) {
    error['errors'] = err.errors;
  }
  res.status(status).json(error);
};
