import {
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  IsPositive,
  ValidateNested,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class FullProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  price: number;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;
}

export class ProductsArrayDto {
  @IsArray()
  @ArrayMinSize(5) // Ensures that the array contains at least five product
  @ValidateNested({ each: true }) // Validates each product in the array
  @Type(() => FullProductDto) // Ensures the transformation to `ProductDto`
  products: FullProductDto[];
}
