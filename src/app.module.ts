import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { JuicesController } from './juices/juices.controller';
import { DrinksController } from './modules/drinks/drinks.controller';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      database: 'postgres',
      host: 'localhost',
      password: 'pass123',
      port: 5432,
      synchronize: true,
      type: 'postgres',
      username: 'postgres',
    }),
  ],
  controllers: [AppController, JuicesController, DrinksController],
  providers: [AppService],
})
export class AppModule {}
