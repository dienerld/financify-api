import { Category } from '../../entities';

export interface CategoryRepository {
  save(category: Category): Promise<void>;
  list(): Promise<Category[]>;
  findOne(value: string | number): Promise<Category>;
}

export const CategoryRepositoryKey = Symbol('CATEGORY_REPOSITORY');
