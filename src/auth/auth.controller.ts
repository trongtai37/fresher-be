import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LocalStrategy } from './strategy/local.strategy';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalStrategy)
  @Post('/login')
  logIn(@Request() req) {
    return req.user;
  }

  @Post('/signup')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.createNewUser(dto);
  }
}
