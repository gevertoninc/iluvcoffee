import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  offset?: number;
}
