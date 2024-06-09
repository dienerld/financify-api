import { Provider } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

import { UserRepositoryKey } from '../../core/interfaces';
import { PrismaUserRepository } from './user.repository';

export const userRepositoryProvider: Provider = {
  provide: UserRepositoryKey,
  useFactory: (prismaService: PrismaService) =>
    new PrismaUserRepository(prismaService),
  inject: [PrismaService],
};
