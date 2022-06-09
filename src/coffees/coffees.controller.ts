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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Protocol } from '../common/decorators/protocol.decorator';
import { Public } from '../common/decorators/public.decorator';
import { PaginationQueryDto as PaginationDto } from '../common/dto/pagination-query.dto';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@ApiTags('coffees')
@UsePipes(ValidationPipe)
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Public()
  @UsePipes()
  @Get()
  async findAll(
    @Protocol() protocol: string,
    @Query() pagination: PaginationDto,
  ): Promise<Coffee[]> {
    console.log(`Protocol: ${protocol}`);

    await new Promise((resolve) => setTimeout(resolve, 5000));

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
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Coffee> {
    return this.coffeesService.findOne(id);
  }

  @Post()
  async create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<Coffee> {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Coffee> {
    return this.coffeesService.remove(id);
  }
}
