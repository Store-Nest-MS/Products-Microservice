import {
  INestApplication,
  INestMicroservice,
  ValidationPipe,
} from '@nestjs/common';

export function setGlobalPipes(app: INestApplication | INestMicroservice) {
  // Gloabal pipes: Transform the data incoming from every request
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );
}
