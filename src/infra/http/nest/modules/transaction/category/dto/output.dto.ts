import {
  Category,
  CategoryType,
} from '@/core/modules/transaction/entities/category.entity';
import {
  IsBoolean,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CategoryDto {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  code: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsIn(['income', 'expense'])
  type: CategoryType;

  @IsBoolean()
  disabled: boolean;

  @IsBoolean()
  blocked: boolean;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  constructor(category: Category) {
    Object.assign(this, category.toJSON());
  }
}
