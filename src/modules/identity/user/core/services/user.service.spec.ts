import { EncrypterMock } from '../../__tests__/encrypter-mock';
import { UserRepositoryMock } from '../../__tests__/user-repository-mock';
import { UserRepository, Encrypter } from '../interfaces';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;
  let encrypter: Encrypter;

  beforeEach(async () => {
    userRepository = new UserRepositoryMock();
    encrypter = new EncrypterMock();
    service = new UserService(userRepository, encrypter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
