import { Request, Response, NextFunction } from 'express';
import { UnprocessableEntityException } from 'src/utils/exceptions/http.exception';
import { ZodSchema } from 'zod';

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const merged = {
      ...req.params,
      ...req.query,
      ...req.body,
    };

    const result = schema.safeParse(merged);
    if (!result.success) {
      throw new UnprocessableEntityException({
        errors: result.error.format(),
      });
    }

    // Only replace `req.body` to avoid tampering with `params` and `query`
    req.body = result.data;
    next();
  };
