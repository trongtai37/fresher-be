import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './configs/database/typeorm.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
