import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll(): Coffee[] {
    return this.coffees;
  }

  findOne(id: number): Coffee {
    const coffee: Coffee = this.coffees.find((item) => {
      return this.haveTheId(item, id);
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return coffee;
  }

  create(createCoffeeDto: any): void {
    this.coffees.push(createCoffeeDto);
  }

  update(id: number, updateCoffeeDto: any): void {
    const existingCoffee: Coffee = this.findOne(id);

    if (existingCoffee) {
      // update the existing entity
    }
  }

  remove(id: number): void {
    const coffeeIndex: number = this.coffees.findIndex((item) => {
      return this.haveTheId(item, id);
    });

    if (coffeeIndex > -1) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }

  haveTheId(item: Coffee, id: number): boolean {
    return item.id === +id;
  }

  randomError(): void {
    throw 'Random error';
  }
}
