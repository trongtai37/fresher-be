import { OmitType } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';

export class CreateProductPayload extends OmitType(Product, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {}

export class UpdateProductPayload extends OmitType(Product, [
  'createdAt',
  'updatedAt',
] as const) {}
