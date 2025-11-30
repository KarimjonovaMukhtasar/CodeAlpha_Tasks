import { z } from 'zod';

export const postValidate = z.object({
  title: z.string().trim().min(5, `POST TITLE CAN'T BE EMPTY`),
  description: z.string().optional(),
  content: z.string().min(10, `TOO SHORT FOR POST CONTENT`).trim(),
});

export const postUpdate = z.object({
  title: z.string().trim().optional(),
  description: z.string().optional(),
  content: z.string().trim().optional()
});

