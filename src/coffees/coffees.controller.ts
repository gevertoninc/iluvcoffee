import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { PaginationQueryDto as PaginationDto } from '../common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  async findAll(@Query() pagination: PaginationDto): Promise<Coffee[]> {
    return this.coffeesService.findAll(pagination);
  }

  @Get('deprecated')
  @HttpCode(HttpStatus.GONE)
  deprecatedAction(): string {
    return 'This action has been deprecated';
  }

  @Get('express-response-object-handling')
  expressResponseObjectHandling(@Res() res: Response): void {
    res
      .status(HttpStatus.OK)
      .send('This action does Express response object handling');
  }

  @Get('random-error')
  randomError(): never {
    return CoffeesService.randomError();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Coffee> {
    return this.coffeesService.findOne(id);
  }

  @Post()
  async create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<Coffee> {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Coffee> {
    return this.coffeesService.remove(id);
  }
}
