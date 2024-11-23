import { Prisma } from '@prisma/client';

/**
 * Checks if the provided error is a Prisma error.
 * @param error - The error object to check.
 * @returns True if the error is a Prisma error, false otherwise.
 */
export function isPrismaError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientUnknownRequestError ||
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientRustPanicError
  );
}
