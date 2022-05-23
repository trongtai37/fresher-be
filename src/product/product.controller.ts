import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from '@share/guards';
import { Repository } from 'typeorm';
import { ProductListQuery, ProductListResult } from './dto/product-list.dto';
import { CreateProductPayload, UpdateProductPayload } from './dto/product.dto';
import { Product } from './entities/product.entity';

@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  @ApiResponse({
    type: ProductListResult,
  })
  @Get()
  async getProducts(@Query() productQuery: ProductListQuery) {
    const { page = 1, perPage = 10 } = productQuery;
    const [data, totalCount] = await this.productRepo.findAndCount({
      skip: perPage * (page - 1),
      take: perPage,
    });

    return {
      data,
      page,
      perPage,
      totalCount,
    };
  }

  @ApiResponse({
    type: Product,
  })
  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    return this.productRepo.findOne(id);
  }

  @ApiResponse({
    type: Product,
  })
  @Post()
  async createProduct(
    @Body()
    payload: CreateProductPayload,
  ) {
    return this.productRepo.create(payload).save();
  }

  @ApiResponse({
    type: Product,
  })
  @Put()
  async updateProduct(
    @Body()
    payload: UpdateProductPayload,
  ) {
    const foundProduct = await this.productRepo.findOne(payload.id);

    if (!foundProduct) {
      throw new NotFoundException();
    }

    await this.productRepo.update({ id: payload.id }, payload);

    return this.productRepo.findOne(payload.id);
  }

  @ApiResponse({})
  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.productRepo.delete({ id });
  }
}
