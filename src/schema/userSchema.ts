import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(1),
  email: z.string().email().optional(),
  password: z.string().min(2),
});
