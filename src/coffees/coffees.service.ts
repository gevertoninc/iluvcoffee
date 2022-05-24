import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { CreateFlavorDto } from './dto/create-flavor.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  static haveTheId(item: Coffee, id: number): boolean {
    return item.id === +id;
  }

  static randomError(): never {
    throw 'Random error';
  }

  static throwNotFoundException(id: number): never {
    throw new NotFoundException(`Coffee #${id} not found`);
  }

  async create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const flavors: Flavor[] = await this.preloadFlavorsByName(
      createCoffeeDto.flavors,
    );

    const coffee: Coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });

    return this.save(coffee);
  }

  async findAll(pagination: PaginationQueryDto): Promise<Coffee[]> {
    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: pagination.offset,
      take: pagination.limit,
    });
  }

  async findOne(id: number): Promise<Coffee> {
    const coffee: Coffee = await this.coffeeRepository.findOne({
      relations: ['flavors'],
      where: { id },
    });

    if (!coffee) {
      CoffeesService.throwNotFoundException(id);
    }

    return coffee;
  }

  async preloadFlavorByName(name: string): Promise<Flavor> {
    const flavor: Flavor = await this.flavorRepository.findOne({
      where: { name },
    });

    if (flavor) {
      return flavor;
    }

    return this.flavorRepository.create({ name });
  }

  async preloadFlavorsByName(flavors: CreateFlavorDto[]): Promise<Flavor[]> {
    if (flavors) {
      return Promise.all(
        flavors.map(({ name }) => this.preloadFlavorByName(name)),
      );
    }
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new Event();

      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<Coffee> {
    const coffee: Coffee = await this.findOne(id);

    return this.coffeeRepository.remove(coffee);
  }

  async save(coffee: Coffee): Promise<Coffee> {
    return this.coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee> {
    const flavors: Flavor[] = await this.preloadFlavorsByName(
      updateCoffeeDto.flavors,
    );

    const coffee: Coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });

    if (!coffee) {
      CoffeesService.throwNotFoundException(id);
    }

    return this.save(coffee);
  }
}
