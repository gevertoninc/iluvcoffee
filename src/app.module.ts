import Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig } from './config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { CoffeesModule } from './coffees/coffees.module';
import { DatabaseModule } from './database/database.module';
import { JuicesController } from './juices/juices.controller';
import { DrinksController } from './modules/drinks/drinks.controller';

@Module({
  imports: [
    CoffeeRatingModule,
    CoffeesModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [appConfig],
      validationSchema: false
        ? Joi.object({
            DATABASE_HOST: Joi.required(),
            DATABASE_PORT: Joi.number().default(5432),
          })
        : undefined,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          autoLoadEntities: true,
          database: process.env.DATABASE_NAME,
          host: process.env.DATABASE_HOST,
          password: process.env.DATABASE_PASSWORD,
          port: +process.env.DATABASE_PORT,
          synchronize: true,
          type: 'postgres',
          username: process.env.DATABASE_USER,
        };
      },
    }),
  ],
  controllers: [AppController, JuicesController, DrinksController],
  providers: [AppService],
})
export class AppModule {}
