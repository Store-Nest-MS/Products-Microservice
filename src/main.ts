import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { env } from '@config/env';
import { setGlobalPipes } from '@lib/setGlobalPipes';
import { AppModule } from '@app/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const loger = new Logger('PRODUCTS_MS');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { port: env.PORT, host: 'localhost' },
    },
  );

  setGlobalPipes(app);
  await app.listen();
  loger.log('PRODUCTS-MS RUNNING ON PORT ' + env.PORT);
}
bootstrap();
