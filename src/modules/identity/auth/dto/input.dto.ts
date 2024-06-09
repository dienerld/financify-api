import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    name: 'email',
    type: String,
    description: 'User email',
    example: 'example@mail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    type: String,
    description: 'User password',
    example: 'password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    name: 'remember',
    type: Boolean,
    description: 'Remember user session',
    example: false,
  })
  @Type(() => Boolean)
  @IsBoolean()
  remember: boolean;
}
