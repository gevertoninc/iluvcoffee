import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { JuicesController } from './juices/juices.controller';
import { DrinksController } from './modules/drinks/drinks.controller';

@Module({
  imports: [CoffeesModule],
  controllers: [AppController, JuicesController, DrinksController],
  providers: [AppService],
})
export class AppModule {}
