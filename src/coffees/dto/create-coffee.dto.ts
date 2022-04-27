import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CreateFlavorDto } from './create-flavor.dto';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'Name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Brand' })
  @IsNotEmpty()
  @IsString()
  readonly brand: string;

  @ApiProperty({ description: 'Flavors' })
  @IsNotEmpty({ each: true })
  @ArrayNotEmpty()
  @IsArray()
  readonly flavors: CreateFlavorDto[];
}
