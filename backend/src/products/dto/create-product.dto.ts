import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Название товара' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ description: 'Описание товара' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Цена товара' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ description: 'Цена со скидкой' })
  @IsNumber()
  @IsOptional()
  @Min(0)
  discountPrice?: number;
}
