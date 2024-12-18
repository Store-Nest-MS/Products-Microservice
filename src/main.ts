import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { env } from '@config/env';
import { setGlobalPipes } from '@lib/setGlobalPipes';
import { AppModule } from '@app/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('PRODUCTS_MS');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: { servers: env.NATS_SERVERS },
    },
  );

  setGlobalPipes(app);
  await app.listen();
  logger.log('PRODUCTS-MS RUNNING ');
  logger.log('NATS SERVERS ' + JSON.stringify(env.NATS_SERVERS));
}
bootstrap();
