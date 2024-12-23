import * as dotenv from 'dotenv';

import { z } from 'zod';
dotenv.config();

const EnvSchema = z.object({
  PRODUCTS_MS_DATABASE_URL: z.string().url(),
  NATS_SERVERS: z.array(z.string()).min(1),
});

// type Env = z.infer<typeof EnvSchema>;

// Validate the environment
const { success, data, error } = EnvSchema.safeParse({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});
// Handle errors
if (error) {
  console.log(error.errors);
  throw new Error(`Env load error `);
}

export const env = { ...data };
