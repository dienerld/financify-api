import { Provider } from '@nestjs/common';
import { CategoryRepository } from '@/core/modules/transaction/persistence/repository';
import { InMemoryCategoryRepository } from '@/infra/database/in-memory/category.repository';
import { CategoryService } from '@/core/modules/transaction/services';

const InMemoryDbProvider: Provider = {
  provide: CategoryRepository,
  useClass: InMemoryCategoryRepository,
};

export const categoryProviders = [
  InMemoryDbProvider,
  {
    provide: CategoryService.name,
    useFactory: (categoryRepository: CategoryRepository) =>
      new CategoryService(categoryRepository),
    inject: [CategoryRepository],
  },
];
