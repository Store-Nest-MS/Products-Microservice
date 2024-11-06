import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

export function isDatabaseError(error: any) {
  return error instanceof PrismaClientKnownRequestError ||
    error instanceof PrismaClientValidationError
    ? true
    : false;
}
