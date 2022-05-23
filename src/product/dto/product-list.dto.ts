import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';
import { Product } from '../entities/product.entity';

export class ProductListQuery {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsOptional()
  @IsPositive()
  page?: number;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  @IsOptional()
  @IsPositive()
  perPage?: number;
}

export class ProductListResult extends ProductListQuery {
  @ApiProperty({
    type: [Product],
  })
  data: Product[];

  @ApiProperty({
    type: Number,
    example: 100,
  })
  totalCount: number;
}
