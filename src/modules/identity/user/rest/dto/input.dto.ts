import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserProps } from '../../core/entities';
import { IsUlid } from '@/common/decorator/is-ulid.decorator';

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

export class ParamFindOneUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'id',
    type: String,
    description: 'Deve ser o identificador do usuário',
  })
  @IsUlid({ message: 'ID inválido' })
  id: string;
}
