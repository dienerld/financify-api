import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserProps } from '../../core/entities';

export class CreateUserDto implements CreateUserProps {
  @IsString({ message: 'Nome inválido' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @ApiProperty({
    name: 'name',
    type: String,
    example: 'John Doe',
    description: 'Must describe the name of the user',
  })
  name: string;

  @IsString({ message: 'Email inválido' })
  @IsEmail(undefined, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @ApiProperty({
    name: 'email',
    type: String,
    example: 'mail@mail.com',
  })
  email: string;

  @IsString({ message: 'Senha inválida' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @ApiProperty({
    name: 'password',
    type: String,
    example: '123456',
  })
  password: string;
}
