import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserProps } from '../../core/entities';

export class CreateUserDto implements CreateUserProps {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'name',
    type: String,
    example: 'John Doe',
    description: 'Must describe the name of the user',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    type: String,
    example: 'mail@mail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'password',
    type: String,
    example: '123456',
  })
  password: string;
}
