import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomResponseDto } from '@/common/interceptor/dto/response.dto';
import { User } from '../../core/entities';

export class UserDto {
  @ApiProperty({
    name: 'id',
    type: String,
    description: 'User id',
    example: '01HZX0A4JRJQ4VKWT9PPZFANWY',
  })
  @IsString()
  id: string;

  @ApiProperty({
    name: 'name',
    type: String,
    description: 'User name',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'email',
    type: String,
    description: 'User email',
    example: 'john@maiil.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'disabled',
    type: Boolean,
    description: 'User is disabled',
    example: false,
  })
  @IsBoolean()
  disabled: boolean;

  @ApiProperty({
    name: 'blocked',
    type: Boolean,
    description: 'User is blocked',
    example: false,
  })
  @IsBoolean()
  blocked: boolean;

  @ApiProperty({
    name: 'createdAt',
    type: Date,
    description: 'User created at',
    example: '2021-01-01T00:00:00.000Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    name: 'updatedAt',
    type: Date,
    description: 'User updated at',
    example: '2021-01-01T00:00:00.000Z',
  })
  @IsDate()
  updatedAt: Date;

  constructor(user: User) {
    Object.assign(this, user.toJSON());
  }
}

class ResponseUserWithPagination {
  @ApiProperty({
    name: 'count',
    type: Number,
  })
  count: number;

  @ApiProperty({
    name: 'categories',
    type: UserDto,
    isArray: true,
  })
  categories: UserDto[];
}

export class SchemaUserResponse extends CustomResponseDto<UserDto> {
  @ApiProperty({
    name: 'data',
    type: UserDto,
  })
  data: UserDto;
}

export class SchemaUserResponseList extends CustomResponseDto<ResponseUserWithPagination> {
  @ApiProperty({
    name: 'data',
    type: ResponseUserWithPagination,
  })
  data: ResponseUserWithPagination;
}
