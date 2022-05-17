import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUser } from '@share/decorator';
import { JwtAuthGuard } from '@share/guards/jwt.guards';
import { JwtUser } from 'src/app.interface';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserDetail(@GetUser() jwtUser: JwtUser) {
    const user = await this.userRepo.findOne(jwtUser.sub);
    delete user.password;

    return user;
  }

  @ApiBody({
    type: User,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUser(
    @GetUser() jwtUser: JwtUser,
    @Body()
    partialUser: Pick<User, 'firstName' | 'lastName' | 'address1' | 'address2'>,
  ) {
    return this.userRepo.update({ id: jwtUser.sub }, partialUser);
  }
}
