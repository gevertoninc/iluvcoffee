import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly brand: string;
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @ArrayNotEmpty()
  @IsArray()
  readonly flavors: string[];
}
