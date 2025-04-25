import { z } from 'zod';
// Auth validation

export const LoginDto = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(72),
});
export type LoginDtoType = z.infer<typeof LoginDto>;
export const RegisterDto = z.object({
  name: z.string().min(3).max(40),
  email: z.string().email(),
  password: z.string().min(6).max(72),
});
export type RegisterDtoType = z.infer<typeof RegisterDto>;
