import { env } from './config/env';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setGlobalPipes } from './lib/setGlobalPipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setGlobalPipes(app);
  await app.listen(env.PORT, () => {
    console.log(`App running on port ${env.PORT}`);
  });
}
bootstrap();
