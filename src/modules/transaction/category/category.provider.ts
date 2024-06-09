import { Provider } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';
import {
  CategoryRepository,
  CategoryRepositoryKey,
} from './core/persistence/repository';
import { CategoryService } from './core/services';
import { PrismaCategoryRepository } from './persistence/repositories/category.repository';

const PrismaDbProvider: Provider = {
  provide: CategoryRepositoryKey,
  useFactory: (prismaService: PrismaService) =>
    new PrismaCategoryRepository(prismaService),
  inject: [PrismaService],
};

export const categoryProviders = [
  PrismaService,
  PrismaDbProvider,
  {
    provide: CategoryService.name,
    useFactory: (categoryRepository: CategoryRepository) =>
      new CategoryService(categoryRepository),
    inject: [CategoryRepositoryKey],
  },
];
