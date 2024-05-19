import { Provider } from '@nestjs/common';
import { CategoryRepository } from '@/core/modules/transaction/persistence/repository';
// import { InMemoryCategoryRepository } from '@/infra/database/in-memory/category.repository';
import { CategoryService } from '@/core/modules/transaction/services';
import { PrismaCategoryRepository } from '@/infra/database/prisma/repositories/category.repository';
import { PrismaService } from '../../../common/prisma/prisma.service';

// const InMemoryDbProvider: Provider = {
//   provide: CategoryRepository,
//   useClass: InMemoryCategoryRepository,
// };

const PrismaDbProvider: Provider = {
  provide: CategoryRepository,
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
    inject: [CategoryRepository],
  },
];
