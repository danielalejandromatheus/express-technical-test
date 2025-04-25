import mongoose from 'mongoose';
import { z } from 'zod';

export const ObjectIdSchema = z
  .string()
  .refine((val: string) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });
export const createPaginationDto = <T extends readonly [string, ...string[]]>(
  sortableFields: T
) =>
  z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
    query: z.string().optional(),
    field: z.enum(sortableFields).optional(),
    orderBy: z.enum(sortableFields).optional(),
    order: z.enum(['asc', 'desc']).default('asc'),
  });
