import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import {
  CategoryType,
  CreateCategoryProps,
} from '../../core/entities/category.entity';

export class CreateCategoryDto implements CreateCategoryProps {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['income', 'expense'])
  type: CategoryType;
}
