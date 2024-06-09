import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../core/services';
import {
  Encrypter,
  EncrypterKey,
  UserRepository,
  UserRepositoryKey,
} from '../core/interfaces';
import { EncrypterMock } from '../__tests__/encrypter-mock';
import { UserRepositoryMock } from '../__tests__/user-repository-mock';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EncrypterKey,
          useValue: EncrypterMock,
        },
        {
          provide: UserRepositoryKey,
          useClass: UserRepositoryMock,
        },
        {
          provide: UserService.name,
          useFactory: (repository: UserRepository, encrypter: Encrypter) =>
            new UserService(repository, encrypter),
          inject: [UserRepositoryKey, EncrypterKey],
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
