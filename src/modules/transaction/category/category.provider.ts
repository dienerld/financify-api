import { Provider } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';
import {
  CategoryRepository,
  CategoryRepositoryKey,
} from './core/persistence/repository';
import { CategoryService } from './core/services';
import { PrismaCategoryRepository } from './persistence/repositories/category.repository';

// const InMemoryDbProvider: Provider = {
//   provide: CategoryRepository,
//   useClass: InMemoryCategoryRepository,
// };

const PrismaDbProvider: Provider = {
  provide: CategoryRepositoryKey,
  useFactory: (prismaService: PrismaService) =>
    new PrismaCategoryRepository(prismaService),
  inject: [PrismaService],
};

export const categoryProviders = [
  // InMemoryDbProvider,
  PrismaService,
  PrismaDbProvider,
  {
    provide: CategoryService.name,
    useFactory: (categoryRepository: CategoryRepository) =>
      new CategoryService(categoryRepository),
    inject: [CategoryRepositoryKey],
  },
];
