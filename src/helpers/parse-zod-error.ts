import { ZodError } from 'zod';

export function parseZodError(error: ZodError) {
  const { errors } = error;
  const obj: Record<string, string> = {};

  for (const err of errors) {
    const key = err.path.join('.');
    obj[key] = err.message;
  }

  return obj;
}
