import { PrismaService } from '@/common/prisma/prisma.service';
import {
  Encrypter,
  EncrypterKey,
  UserRepository,
  UserRepositoryKey,
} from '../user/core/interfaces';
import { encrypterProvider } from '../user/external/encrypter/encrypter.provider';
import { userRepositoryProvider } from '../user/external/repositories/user-repository.provider';
import { AuthService } from './core/auth.service';
import { JwtService } from '@nestjs/jwt';

export const AuthProviders = [
  PrismaService,
  encrypterProvider,
  userRepositoryProvider,
  {
    provide: AuthService.name,
    useFactory: (
      userRepository: UserRepository,
      encrypter: Encrypter,
      jwtService: JwtService,
    ) => new AuthService(userRepository, encrypter, jwtService),
    inject: [UserRepositoryKey, EncrypterKey, JwtService],
  },
];
