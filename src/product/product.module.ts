import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    JwtModule.register({
      secret: 'jwt-secret',
    }),
  ],
  providers: [],
  controllers: [ProductController],
  exports: [TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
