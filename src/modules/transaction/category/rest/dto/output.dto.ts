import { CategoryType } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { Category } from '../../core/entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CustomResponseDto } from '@/common/interceptor/dto/response.dto';

export class CategoryDto {
  @ApiProperty()
  @IsUUID('4')
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  code: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsIn(['income', 'expense'])
  type: CategoryType;

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

  constructor(category: Category) {
    Object.assign(this, category.toJSON());
  }
}

class ResponseCategoryWithPagination {
  @ApiProperty({
    name: 'count',
    type: Number,
  })
  count: number;

  @ApiProperty({
    name: 'categories',
    type: CategoryDto,
    isArray: true,
  })
  categories: CategoryDto[];
}

export class SchemaResponseCategory extends CustomResponseDto<CategoryDto> {
  @ApiProperty({
    name: 'data',
    type: CategoryDto,
  })
  data: CategoryDto;
}

export class SchemaResponseCategoryList extends CustomResponseDto<ResponseCategoryWithPagination> {
  @ApiProperty({
    name: 'data',
    type: ResponseCategoryWithPagination,
  })
  data: ResponseCategoryWithPagination;
}
