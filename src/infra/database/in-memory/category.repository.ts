import { Category } from '@/core/modules/transaction/entities/category.entity';
import { CategoryRepository } from '@/core/modules/transaction/persistence/repository/category.interface';
import { BaseInMemoryRepository } from './base-in-memory.repository';
import { PersistenceNotFoundException } from '../exception/client.exception';

export class InMemoryCategoryRepository
  extends BaseInMemoryRepository
  implements CategoryRepository
{
  private categories: Category[] = [];

  async save(category: Category): Promise<void> {
    const autoIncrement = this.categories.length + 1;
    category.assignCode(autoIncrement);
    this.categories.push(category);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async findOne(value: string | number): Promise<Category> {
    try {
      let category: Category | undefined = undefined;
      switch (typeof value) {
        case 'string':
          category = this.categories.find((c) => c.getName() === value);
          break;
        case 'number':
          category = this.categories.find((c) => c.getCode() === value);
          break;
      }

      if (!category) {
        throw new PersistenceNotFoundException('Category not found');
      }
      return category;
    } catch (error) {
      this.handleAndThrowError(error);
    }
  }
}
