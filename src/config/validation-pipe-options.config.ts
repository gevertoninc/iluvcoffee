import { ValidationPipeOptions } from '@nestjs/common';

const validationPipeOptions: ValidationPipeOptions = {
  transform: true,
  forbidNonWhitelisted: true,
  whitelist: true,
};

export { validationPipeOptions };
