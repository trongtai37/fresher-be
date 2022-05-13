import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'Email account',
  })
  @IsNotEmpty({
    message: 'Email is mandatory',
  })
  @IsEmail({}, { message: 'Email is incorrect. Please try again!' })
  email: string;

  @ApiProperty({
    minimum: 8,
    maximum: 35,
    description: 'At least 1 capital, 1 small, 1 special character & 1 number',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Password is mandatory',
  })
  password: string;
}
