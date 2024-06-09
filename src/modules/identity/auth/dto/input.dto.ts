import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    name: 'email',
    type: String,
    description: 'User email',
    example: 'example@mail.com',
  })
  @IsEmail(undefined, { message: 'Email inválido' })
  @IsString({ message: 'Email é obrigatório' })
  email: string;

  @ApiProperty({
    name: 'password',
    type: String,
    description: 'User password',
    example: 'password',
  })
  @IsString({ message: 'Senha é obrigatória' })
  password: string;
}
