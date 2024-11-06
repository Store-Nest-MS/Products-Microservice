import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

class DatabaseError {
  message: string;

  constructor(
    error: PrismaClientKnownRequestError | PrismaClientValidationError,
  ) {
    // Handle multiple errors of primsa
    if (error instanceof PrismaClientKnownRequestError) {
      this.message = error.message;
    }
  }
}

// TODO: This class should hanlde all type of errors
// Database errors

// class ErrorFactory {
//   constructor() {}
// }
