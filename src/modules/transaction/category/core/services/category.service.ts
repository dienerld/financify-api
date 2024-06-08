import { Category, CreateCategoryProps } from '../entities';
import { CategoryRepository } from '../persistence/repository';

export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async save(categoryDto: CreateCategoryProps): Promise<Category> {
    const category = Category.createNew(categoryDto);
    await this.categoryRepository.save(category);
    return category;
  }

  async list(): Promise<Category[]> {
    return this.categoryRepository.list();
  }

  async findOne(value: string | number): Promise<Category> {
    return this.categoryRepository.findOne(value);
  }
}
