import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { env } from '@config/env';
import { setGlobalPipes } from '@lib/setGlobalPipes';
import { AppModule } from '@app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    { transport: Transport.TCP, options: { port: env.PORT } },
  );

  setGlobalPipes(app);
  await app.listen();
}
bootstrap();
