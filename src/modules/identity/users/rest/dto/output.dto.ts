import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomResponseDto } from '@/common/interceptor/dto/response.dto';
import { User } from '../../core/entities';

export class UserDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsBoolean()
  disabled: boolean;

  @ApiProperty()
  @IsBoolean()
  blocked: boolean;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
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

export class SchemaResponseUser extends CustomResponseDto<UserDto> {
  @ApiProperty({
    name: 'data',
    type: UserDto,
  })
  data: UserDto;
}

export class SchemaResponseCategoryList extends CustomResponseDto<ResponseUserWithPagination> {
  @ApiProperty({
    name: 'data',
    type: ResponseUserWithPagination,
  })
  data: ResponseUserWithPagination;
}
