import { PersistenceNotFoundException } from '@/database/exception/client.exception';
import { Category } from '../core/entities';
import { CategoryRepository } from '../core/persistence/repository';

export class CategoryRepositoryMock implements CategoryRepository {
  private categories: Category[] = [];

  async save(category: Category): Promise<void> {
    this.categories.push(category);
    const lastCode = this.categories.length;
    category.assignCode(lastCode);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async findOne(value: string | number): Promise<Category> {
    let category: Category | undefined;
    if (typeof value === 'number') {
      category = this.categories.find((c) => c.getCode() === value);
    } else {
      category = this.categories.find((c) => c.getId() === value);
    }

    if (!category) {
      throw new PersistenceNotFoundException('Category not found');
    }
    return category;
  }
}
