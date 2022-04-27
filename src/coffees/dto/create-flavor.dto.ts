import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CreateCoffeeDto } from './create-coffee.dto';

export class CreateFlavorDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty({ each: true })
  @ArrayNotEmpty()
  @IsArray()
  readonly coffees: CreateCoffeeDto[];
}
