import * as dotenv from 'dotenv';

import { z } from 'zod';
dotenv.config();

const EnvSchema = z.object({
  PORT: z.coerce.number().positive(),
  DATABASE_URL: z.string().url(),
});

// type Env = z.infer<typeof EnvSchema>;

// Validate the environment
const { success, data, error } = EnvSchema.safeParse(process.env);
// Handle errors
if (error) {
  console.log(error.errors);
  throw new Error(`Env load error `);
}

export const env = { ...data };
