import { DynamicModule, Module } from '@nestjs/common';
import { ConnectionOptions, createConnection } from 'typeorm';
import { coffeesConstants } from '../coffees/coffees.constants';

@Module({})
export class DatabaseModule {
  static register(options: ConnectionOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: coffeesConstants.CONNECTION,
          useValue: createConnection(options),
        },
      ],
    };
  }
}
