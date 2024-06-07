import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import {
  CategoryType,
  CreateCategoryProps,
} from '../../core/entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto implements CreateCategoryProps {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'name',
    type: String,
    example: 'Category one',
    description: ' Must describe the name of the category',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'description',
    type: String,
    example: 'This first category',
    description: 'Must be a category description',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['income', 'expense'])
  @ApiProperty({
    name: 'type',
    type: String,
    enum: ['income', 'expense'],
    description: 'Specifies the category type',
  })
  type: CategoryType;
}
