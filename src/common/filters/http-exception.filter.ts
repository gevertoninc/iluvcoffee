import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const status = exception.getStatus();
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const exceptionResponse = exception.getResponse();
    const error = this.getErrorFromResponse(response, exceptionResponse);
    const errorWithTimestamp = {
      ...error,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(errorWithTimestamp);
  }

  getErrorFromResponse(
    response: Response,
    exceptionResponse: string | object,
  ): object {
    return typeof response === 'string'
      ? { message: exceptionResponse }
      : (exceptionResponse as object);
  }
}
