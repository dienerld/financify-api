import { PrismaService } from '@common/prisma/prisma.service';
import {
  Encrypter,
  EncrypterKey,
  UserRepository,
  UserRepositoryKey,
} from './core/interfaces';
import { UserService } from './core/services';
import { encrypterProvider } from './external/encrypter/encrypter.provider';
import { userRepositoryProvider } from './external/repositories/user-repository.provider';

export const UserProviders = [
  PrismaService,
  userRepositoryProvider,
  encrypterProvider,
  {
    provide: UserService.name,
    useFactory: (userRepository: UserRepository, encrypter: Encrypter) =>
      new UserService(userRepository, encrypter),
    inject: [UserRepositoryKey, EncrypterKey],
  },
];
