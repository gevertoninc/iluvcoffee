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
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(@Query() pagination: any): Coffee[] {
    const { limit, offset } = pagination;

    return this.coffeesService.findAll();
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
  randomError(): void {
    return this.coffeesService.randomError();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Coffee {
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto): void {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ): void {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): void {
    return this.coffeesService.remove(id);
  }
}
