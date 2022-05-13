import { InjectRepository } from '@nestjs/typeorm';
import { Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '@share/decorator';
import { JwtAuthGuard } from '@share/guards/jwt.guards';
import { JwtUser } from 'src/app.interface';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

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
    return this.userRepo.findOne(jwtUser.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUser(
    @GetUser() jwtUser: JwtUser,
    // @Body() updateData: UpdateUserDto,
  ) {
    return this.userRepo.update({ id: jwtUser.id }, {});
  }
}
