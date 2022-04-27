import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationPipeOptions } from './config/validation-pipe-options.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  const port = 3000;

  await app.listen(port);

  const url = await app.getUrl();

  console.log(`${url}`);
}

bootstrap();
