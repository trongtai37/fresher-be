import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags, ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

class LoginRes {
  @ApiProperty({ type: String })
  access_token: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    type: SignInDto,
  })
  @ApiResponse({
    type: LoginRes,
  })
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  logIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBody({
    type: SignInDto,
  })
  @ApiResponse({
    type: User,
  })
  @Post('/signup')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.createNewUser(dto);
  }
}
