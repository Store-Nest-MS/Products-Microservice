import { ZodError } from 'zod';

export function prettyZodErrors<T>(error: ZodError<T>) {
  return error.errors.map((er) => {
    const { path, message } = er;
    return { path, message };
  });
}
