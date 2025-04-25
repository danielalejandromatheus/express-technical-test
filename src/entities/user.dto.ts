// Validator for create and update for user
import { z } from 'zod';
import { ROLES } from 'src/consts/user';
import { ObjectIdSchema } from './common.dto';

export const userCreateValidator = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6).max(20),
  role: z.array(z.enum(ROLES)).optional(),
});

export const userUpdateValidator = userCreateValidator.partial().extend({
  id: ObjectIdSchema,
});
