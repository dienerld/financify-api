import { EncrypterMock } from '../../__tests__/encrypter-mock';
import { UserRepositoryMock } from '../../__tests__/user-repository-mock';
import { UserRepository, Encrypter } from '../interfaces';
import { UserService } from './user.service';
import { PersistenceBadRequestException } from '@/database/exception/client.exception';
import { CreateUserProps, User } from '../entities';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;
  let encrypter: Encrypter;

  beforeAll(async () => {
    userRepository = new UserRepositoryMock();
    encrypter = new EncrypterMock();
    service = new UserService(userRepository, encrypter);
  });

  beforeEach(() => {
    UserRepositoryMock.users = [];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('save', () => {
    const userDto: CreateUserProps = {
      name: 'test',
      email: 'test@example.com',
      password: 'password',
    };

    it('should save a new user', async () => {
      const result = await service.save(userDto);

      expect(result).toBeInstanceOf(User);
      expect(result.getName()).toBe(userDto.name);
    });

    it('should throw an error when user already exists', async () => {
      await service.save(userDto);

      const result = service.save(userDto);

      await expect(result).rejects.toThrowError(PersistenceBadRequestException);
    });
  });

  describe('List', () => {
    it('should list all users', async () => {
      const result = await service.list();

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(0);
    });

    it('should list all users with one user', async () => {
      await service.save({
        name: 'test',
        email: 'test@mail.com',
        password: 'password',
      });

      const result = await service.list();

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(1);
    });

    it('should list all users with two users', async () => {
      await service.save({
        name: 'test',
        email: 'one@mail.com',
        password: 'password',
      });

      await service.save({
        name: 'test',
        email: 'two@mail.com',
        password: 'password',
      });

      const result = await service.list();

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(2);
      result.forEach((user) => {
        expect(user).toBeInstanceOf(User);
        expect(user.getEmail()).toMatch(/@mail.com$/);
      });
    });
  });

  describe('findOne', () => {
    it('should find one user', async () => {
      const user = await service.save({
        name: 'test',
        email: 'test@mail.com',
        password: 'password',
      });

      const result = await service.findOne(user.getId());

      expect(result).toBeInstanceOf(User);
      expect(result.getId()).toBe(user.getId());
    });

    it('should throw an error when user not found', async () => {
      const result = service.findOne('1');

      await expect(result).rejects.toThrowError(PersistenceBadRequestException);
    });
  });
});
