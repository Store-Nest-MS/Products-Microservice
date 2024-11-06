import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  // @IsNotEmpty()
  // @IsString()
  // readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0)
  readonly price: number;
}
