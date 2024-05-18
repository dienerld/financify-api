import { CategoryType, CreateCategoryProps } from '@/core/modules/transaction/entities/category.entity';

export class CreateCategoryDto implements CreateCategoryProps {
  name: string;
  description: string;
  type: CategoryType;
}
