import { z } from 'zod';

const userRegisterValidate = z.object({
  username: z
    .string(),
  password: z
    .string()
    .min(5, `TOO SHORT FOR A PASSWORD`),
  email: z.string().email().trim().toLowerCase(),
  first_name: z
    .string()
    .trim()
    .optional(),
  last_name: z
    .string()
    .trim()
    .optional(),
  bio: z
    .string()
    .optional(),
  age: z.coerce.number().positive().optional(),
});

const LoginValidate = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string(),
});

export { userRegisterValidate, LoginValidate };
