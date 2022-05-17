import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@share/guards';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  @ApiResponse({})
  @Get()
  async getProducts() {
    return this.productRepo.findAndCount();
  }

  @ApiResponse({})
  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    return this.productRepo.findOne(id);
  }

  @ApiResponse({})
  @Post()
  async createProduct(
    @Body()
    payload: Pick<
      Product,
      'name' | 'brand' | 'description' | 'price' | 'photos'
    >,
  ) {
    return this.productRepo.create(payload).save();
  }

  @ApiResponse({})
  @Put()
  async updateProduct(
    @Body()
    payload: Pick<
      Product,
      'id' | 'name' | 'brand' | 'description' | 'price' | 'photos'
    >,
  ) {
    const foundProduct = await this.productRepo.findOne(payload.id);

    if (!foundProduct) {
      throw new NotFoundException();
    }

    return this.productRepo.update({ id: payload.id }, payload);
  }

  @ApiResponse({})
  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.productRepo.delete({ id });
  }
}
