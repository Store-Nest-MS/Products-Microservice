import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { env } from '@config/env';
import { setGlobalPipes } from '@lib/setGlobalPipes';
import { AppModule } from '@app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setGlobalPipes(app);
  await app.listen(env.PORT);
}
bootstrap();
