import { INestApplication, ValidationPipe } from '@nestjs/common';

export function setGlobalPipes(app: INestApplication) {
  // Gloabal pipes: Transform the data incoming from every request
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );
}
