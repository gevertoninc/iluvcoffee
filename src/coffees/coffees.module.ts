import { Injectable, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { DatabaseModule } from '../database/database.module';
import { Event } from '../events/entities/event.entity';
import { coffeesConfig } from './coffees.config';
import { coffeesConstants } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
class CoffeeBrandsFactory {
  create(): string[] {
    return ['buddy brew', 'nescafe'];
  }
}

@Module({
  imports: [
    ConfigModule.forFeature(coffeesConfig),
    DatabaseModule.register({
      host: 'localhost',
      password: 'pass123',
      type: 'postgres',
      username: 'postgres',
    }),
    TypeOrmModule.forFeature([Coffee, Event, Flavor]),
  ],
  controllers: [CoffeesController],
  exports: [CoffeesService],
  providers: [
    CoffeeBrandsFactory,
    CoffeesService,
    {
      provide: coffeesConstants.COFFEE_BRANDS,
      useFactory: async (factory: CoffeeBrandsFactory) => factory.create(),
      inject: [CoffeeBrandsFactory],
    },
    {
      provide: coffeesConstants.OTHER_COFFEE_BRANDS,
      useFactory: async (_connection: Connection) =>
        Promise.resolve(['3 corações']),
      inject: [Connection],
    },
  ],
})
export class CoffeesModule {}
