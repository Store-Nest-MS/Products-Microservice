import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDTO {
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  readonly page?: number = 1; //Default values for page

  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  readonly page_size?: number = 10; //Default values for page size
}
