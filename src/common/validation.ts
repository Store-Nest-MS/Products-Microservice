import { MicroserviceOptions } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';
import { z } from 'zod';

const error_schema = z.object({
  status: z
    .number()
    .positive()
    .gte(100)
    .lt(599)
    .refine((value) => Object.values(HttpStatus).includes(value)),
  msg: z.string().min(1),
  meta: z
    .object({
      microservice: z
        .object({
          name: z.string(),
          host: z.string(),
        })
        .optional(),
    })
    .optional(),
});

export type CUSTOM_MICROSERVICE_ERROR = z.infer<typeof error_schema>;
export function is_valid_custom_error(err: any) {
  return error_schema.safeParse(err);
}
