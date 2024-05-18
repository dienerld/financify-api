import {
  CategoryType,
  CreateCategoryProps,
} from '@/core/modules/transaction/entities/category.entity';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

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
