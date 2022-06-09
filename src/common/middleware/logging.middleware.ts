import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware<any, any> {
  use(_req: any, res: any, next: (error?: Error | any) => void): any {
    console.time('Request-response time');
    console.log('Hi from middleware!');

    res.on('finish', () => console.timeEnd('Request-response time'));

    next();
  }
}
