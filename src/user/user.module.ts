import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    JwtModule.register({
      secret: 'jwt-secret',
    }),
  ],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class UserModule {}
