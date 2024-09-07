import { InternalServerErrorException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();

const EnvSchema = z.object({
  PORT: z.coerce.number().int().positive(),
});

type Env = z.infer<typeof EnvSchema>;

const currentEnv: Env = {
  PORT: process.env.PORT as unknown as number,
};

// Validate the environment
EnvSchema.parse(currentEnv);

export const env = { ...currentEnv };
