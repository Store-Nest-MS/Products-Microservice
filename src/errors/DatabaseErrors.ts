import { Prisma } from '@prisma/client';
import { isPrismaError } from './utils';
import { primsa_error_messages } from './const';

class DatabaseErrorFactory {
  private errorInstance: any;

  constructor(errorInstance: any) {
    this.errorInstance = errorInstance;
  }

  //   A function that gets a machine friendly error message depending on the error ORM
  getFriendlyMessage(): string {
    if (isPrismaError(this.errorInstance)) {
      return this.handlePrismaErrors();
    }

    // TODO: Add other ORM errors here
    throw new Error('Unsupported ORM or unknown error.');
  }

  //  A private function that handles all the Prisma errors
  private handlePrismaErrors(): string {
    const error = this.errorInstance;

    // Recheckig what tyep of primsa error it is, return it into the isPrimsaError function
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const msg =
        primsa_error_messages[error.code] + ' ' + JSON.stringify(error?.meta) ||
        `A database error occurred: ${error.message}`;

      return msg;
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      return 'An unknown error occurred while processing your request. Please try again.';
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
      return 'The database connection could not be initialized. Please check the connection settings.';
    }

    if (error instanceof Prisma.PrismaClientRustPanicError) {
      return 'A critical error occurred in the database engine. Please contact support.';
    }

    return 'An unexpected datab error occurred. Please try again later.';
  }
}

export default DatabaseErrorFactory;
